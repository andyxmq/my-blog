import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import Helmet from 'react-helmet';
import {
  inject,
  observer,
} from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import SimpleMDE from 'react-simplemde-editor';

import Container from '../layout/container';
import { topicDetailStyle } from './styles';
import Reply from './reply';

@inject(stores => ({
  topicStore: stores.topicStore,
  user: stores.appState.user,
}))
@observer
class TopicDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      newReply: '',
    };
    this.handleNewReplyChange = this.handleNewReplyChange.bind(this);
  }

  componentDidMount() {
    // const topic = this.props.topicStore.detailMap[id];
    this.props.topicStore.getTopicDetail(this.getTopicId());
  }

  getTopicId() {
    return this.props.match.params.id;
  }

  handleNewReplyChange(value) {
    this.setState({
      newReply: value,
    });
  }

  render() {
    const { classes, user } = this.props;
    const id = this.getTopicId();
    const topic = this.props.topicStore.detailMap[id];

    if (!topic) {
      return (
        <Container>
          <section className={classes.loadingContainer}>
            <CircularProgress color="primary" />
          </section>
        </Container>
      );
    }
    return (
      <div>
        <Container>
          <Helmet>
            <title>{topic.title}</title>
          </Helmet>
          <header className={classes.header}>
            <h3>{topic.title}</h3>
          </header>
          <section className={classes.body}>
            <p dangerouslySetInnerHTML={{ __html: marked(topic.content) }} />
          </section>
        </Container>
        <Paper elevation={4} className={classes.replies}>
          <header className={classes.replyHeader}>
            <span>{`${topic.reply_count} 回复`}</span>
            <span>{`最新回复 ${topic.last_reply_at}`}</span>
          </header>
          {
            user.isLogin
              ? (
                <section className={classes.replyEditor}>
                  <SimpleMDE
                    onChange={this.handleNewReplyChange}
                    value={this.state.newReply}
                    options={{
                      toolbar: false,
                      autoFocus: false,
                      spellChecker: false,
                      placeholder: '添加您的精彩回复',
                    }}
                  />
                </section>
              ) : null
          }
          <section>
            {
              topic.replies.map(reply => <Reply reply={reply} key={reply.id} />)
            }
          </section>
        </Paper>
      </div>
    );
  }
}
TopicDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

TopicDetail.wrappedComponent.propTypes = {
  topicStore: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
export default withStyles(topicDetailStyle)(TopicDetail);
