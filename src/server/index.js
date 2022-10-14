import express from 'express';
import cors from 'cors';
import ReactDOM from 'react-dom/server';
import * as React from 'react';
import App from '../shared/App';
import serialize from 'serialize-javascript';
import { matchPath } from 'react-router-dom';
import routes from '../shared/routes';

import { StaticRouter } from 'react-router-dom/server';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
const app = express();

app.use(cors());
app.use(express.static('dist'));

/**
 * window kullanaarak sunucudan gelen veriyi client tarafına gönderiyoruz .
 */

app.get('*', (req, res, next) => {
  // Aktif olan route'ı buluyoruz.
  const activeRoute =
    routes.find((route) => matchPath(route.path, req.url)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve();

  promise
    .then((data) => {
      const markup = ReactDOM.renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url}>
            <App serverData={data} />
          </StaticRouter>
        </Provider>
      );

      res.send(` 
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with RR</title>
            <link rel="stylesheet" href="/style.css">
          </head>
          <body>
            <div id="root">${markup} </div>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            <script src="/bundle.js"></script>
          </body>
        </html>
      `);
    })
    .catch(next);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
