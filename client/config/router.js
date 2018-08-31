import React from 'react';

import {
  Route,
  Redirect,
} from 'react-router-dom';

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />, // exact: 匹配整个路由
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <Route path="/user/info" component={UserInfo} key="info" />,
];
