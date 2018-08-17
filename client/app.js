import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, pink } from '@material-ui/core/colors';
import App from './views/App1';

import AppState from './store/app-state';

// 创建主题
const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  },
});

const initialState = window.__INITIAL_STATE__ || {}; // eslint-disable-line
const createApp = (TheApp) => {
  class Main extends React.Component {
    // Remove the server-side injected CSS.
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return <TheApp />;
    }
  }
  return Main;
};
const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider appState={new AppState()}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <Component />
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  );
};
render(createApp(App));
if (module.hot) {
  module.hot.accept('./views/App1.jsx', () => {
    const NextApp = require('./views/App1.jsx').default; // eslint-disable-line
    // in all other cases - re-require App manually
    render(createApp(NextApp));
  });
}
