import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppState from '../../store/app-state';
import Container from '../layout/container';
import TopicListItem from './list-item';

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
}))
@observer
export default class TopicList extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }

  componentDidMount() {
    this.props.topicStore.fecthTopics();
  }

  bootstrapper() {
    let that = this;
    return new Promise((resolve) => {
      setTimeout(() => {
        that.props.appState.count = 3;
        resolve(true);
      }, 100);
    });
  }

  changeTab(event, value) {
    this.setState({
      tabIndex: value,
    });
  }

  /* eslint-disable */
  listItemClick() {
    // do some

  }

  /* eslint-enable */

  render() {
    const {
      tabIndex,
    } = this.state;

    const { topicStore } = this.props;
    console.log(topicStore, 'topicStore');
    const { topics: topicList, syncing: syncingTopics } = topicStore;
    return (
      <Container>
        <Helmet>
          <title>
            this is topic list
          </title>
          <meta name="discription" content="this is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <List>
          {
            topicList.map(topic => <TopicListItem key={topic.id} onClick={this.listItemClick} topic={topic} />)
          }
        </List>
        {
          syncingTopics
            ? (<div><CircularProgress color="primary" size={100} /></div>)
            : null
        }
      </Container>
    );
  }
}

TopicList.wrappedComponent.propTypes = {
  // appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.object.isRequired,
};
