import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

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
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="default" onClick={this.onHomeIconClick}>
              <HomeIcon color="primary" />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              JNode
            </Typography>
            <Button variant="outlined" color="default" onClick={this.createButtonClick}>
              创建话题
            </Button>
            <Button color="default" onClick={this.loginButtonClick}>
              登录
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MainAppBar);
