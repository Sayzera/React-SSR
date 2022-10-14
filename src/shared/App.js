import * as React from 'react';
import routes from './routes';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import NoMatch from './NoMatch';
import ColorfulBorder from './ColorfulBorder';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function App({ serverData }) {
  return (
    <React.Fragment>
      <ColorfulBorder />
      <div className="container">
        <Navbar />
        <Routes>
          {routes.map((route) => {
            const { path, fetchInitialData, component: C } = route;

            return (
              <Route
                key={path}
                path={path}
                element={
                  <C data={serverData} fetchInitialData={fetchInitialData} />
                }
              />
            );
          })}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
