import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';
import AppBar from './layout/app-bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return [
      <AppBar />,
      <Routes key="2" />,
    ];
  }
}
