import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import App from './views/App1.jsx';

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
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
