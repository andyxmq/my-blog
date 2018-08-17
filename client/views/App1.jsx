import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';
import AppBar from './layout/app-bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return [
      <AppBar key="1" />,
      <Routes key="2" />,
    ];
  }
}
