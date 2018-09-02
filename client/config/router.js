import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';

import {
  inject,
  observer,
} from 'mobx-react';

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';
import TopicCreate from '../views/topic-create/index';

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props => (
        isLogin
          ? <Component {...props} />
          : (
            <Redirect
              to={{
                pathname: '/user/login',
                search: `?from=${rest.path}`,
              }}
            />
          )
      )
    }
  />
);

// const InjectedPrivateRoute = inject((stores) => ({
//   isLogin: stores.appState.user.isLogin,
// })(observer(PrivateRoute))

const InjectedPrivateRoute = withRouter(inject(stores => ({
  isLogin: stores.appState.user.isLogin,
}))(observer(PrivateRoute)));

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool,
  component: PropTypes.element.isRequired,
};

PrivateRoute.defaultProps = {
  isLogin: false,
};

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />, // exact: 匹配整个路由
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" exact component={UserLogin} key="login" />,
  <InjectedPrivateRoute path="/user/info" component={UserInfo} key="info" />,
  <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="topicCreate" />,
];
