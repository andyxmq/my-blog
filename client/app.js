import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import App from './views/App1';

import AppState from './store/app-state';

const initialState = window.__INITIAL_STATE__ || {}; // eslint-disable-line

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState()}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./views/App1.jsx', () => {
    const NextApp = require('./views/App1.jsx').default; // eslint-disable-line
    // in all other cases - re-require App manually
    render(NextApp);
  });
}
