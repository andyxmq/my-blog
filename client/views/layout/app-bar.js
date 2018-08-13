import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
// import HomeIcon from 'material-ui/HomeIcon';
import Typography from 'material-ui/Typography';

class MainAppBar extends React.Component {
  constructor() {
    super();
    this.onHomeIconClick = this.onHomeIconClick.bind(this);
    this.createButtonClick = this.createButtonClick.bind(this);
    this.loginButtonClick = this.loginButtonClick.bind(this);
  }
  /*eslint-disable*/
  onHomeIconClick() {

  }

  createButtonClick() {

  }

  loginButtonClick() {
    // d
  }

  /* eslint-enable */
  render() {
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="contrast" onClick={this.onHomeIconClick}>
              {/* <HomeIcon /> */}
            </IconButton>
            <Typography variant="title" color="inherit">
              JNode
            </Typography>
            <Button raised color="accent" onClick={this.createButtonClick}>
              创建换题
            </Button>
            <Button color="contrast" onClick={this.loginButtonClick}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default MainAppBar;
