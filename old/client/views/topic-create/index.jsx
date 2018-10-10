import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import {
  inject,
  observer,
} from 'mobx-react';
import Container from '../layout/container';
import createStyles from './styles';
import { tabs } from '../../utils/variable-define';

@inject(stores => (
  {
    topicStore: stores.topicStore,
  }
)) @observer
class TopicCreate extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      tab: '',
      open: false,
      message: '',
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value.trim(),
    });
  }

  handleContentChange(value) {
    this.setState({
      content: value,
    });
  }

  handleChangeTab(e) {
    this.setState({
      tab: e.currentTarget.value,
    });
  }

  handleCreate() {
    const {
      title, content, tab,
    } = this.state;
    if (!title) {
      this.showMessage('title必须填写');
      return;
    }
    if (!content) {
      this.showMessage('content必须填写');
      return;
    }
    let self = this;
    this.props.topicStore.createTopic({ title, content, tab })
      .then(() => {
        self.context.router.history.push('/index');
      }).catch((error) => {
        self.showMessage(error.response.data.error_msg);
      });
  }

  showMessage(message) {
    this.setState({
      message,
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
      message: '',
    });
  }

  render() {
    const { classes } = this.props;
    const { message, open } = this.state;
    return (
      <Container>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          message={message}
          open={open}
          onClose={this.handleClose}
        />
        <div className={classes.root}>
          <TextField
            className={classes.title}
            label="标题"
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth
          />
          <SimpleMDE
            onChange={this.handleContentChange}
            value={this.state.content}
            options={{
              autofocus: true,
              spellChecker: false,
              placeholder: '发表您的精彩的意见',
            }}
          />
          <div>
            {
              Object.keys(tabs).map((tab) => {
                if (tab !== 'all' && tab !== 'good') {
                  return (
                    <span className={classes.selectItem} key={tab}>
                      <Radio
                        value={tab}
                        checked={tab === this.state.tab}
                        onChange={this.handleChangeTab}
                      />
                      {tabs[tab]}
                    </span>
                  );
                }
                return null;
              })
            }
          </div>
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleCreate}
            className={classes.createButton}
          >
            回复
          </Button>
        </div>
      </Container>
    );
  }
}

TopicCreate.propType = {
  classes: PropTypes.object.isRequired,
};

TopicCreate.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
};

export default withStyles(createStyles)(TopicCreate);
