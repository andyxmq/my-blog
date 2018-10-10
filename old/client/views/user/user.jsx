/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  inject,
  observer,
} from 'mobx-react';

import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import Container from '../layout/container';
import userStyles from './styles/user-style';

@inject(stores => ({
  user: stores.appState.user,
})) @observer
class User extends React.Component {
  componentDidMount() {
    // do someting here
  }

  render() {
    const { classes } = this.props;
    const { info } = this.props.user;
    return (
      <Container>
        <div className={classes.avatar}>
          <div className={classes.bg} />
          {
            info.avatar_url
              ? <Avatar className={classes.avatarImg} src={info.avatar_url} />
              : (
                <Avatar className={classes.avatarImg}>
                  登录
                </Avatar>
              )
          }
          <span className={classes.userName}>{ info.loginname || '未登录'}</span>
        </div>
        {this.props.children}
      </Container>
    );
  }
}

User.wrappedComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

User.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

export default withStyles(userStyles)(User);
