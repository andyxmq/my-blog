import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // doSomething
  }

  render() {
    return [
      <div key="1">
        <Link to="/">
          首页
        </Link>
        <br />
        <Link to="/detail">
          详情页
        </Link>
      </div>,
      <Routes key="2" />,
    ];
  }
}
