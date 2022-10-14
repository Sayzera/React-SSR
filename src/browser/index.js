import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/App';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  root
);
