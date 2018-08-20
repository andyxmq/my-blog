import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import queryString from 'query-string';

import AppState from '../../store/app-state';
import Container from '../layout/container';
import TopicListItem from './list-item';
import { tabs } from '../../utils/variable-define';

@inject(stores => ({
  appState: stores.appState,
  topicStore: stores.topicStore,
}))
@observer
export default class TopicList extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }

  componentDidMount() {
    this.props.topicStore.fecthTopics(this.getTab());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fecthTopics(this.getTab(nextProps.location.search));
    }
  }

  getTab(search) {
    search = search || this.props.location.search;
    const { tab } = queryString.parse(search);
    return tab || 'all';
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
    this.context.router.history.push({
      pathname: '/list',
      search: `?tab=${value}`,
    });
  }

  /* eslint-disable */
  listItemClick() {
    // do some

  }

  /* eslint-enable */

  render() {
    const { topicStore } = this.props;
    const { topics: topicList, syncing: syncingTopics } = topicStore;
    return (
      <Container>
        <Helmet>
          <title>
            this is topic list
          </title>
          <meta name="discription" content="this is description" />
        </Helmet>
        <Tabs value={this.getTab()} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(item => <Tab key={item} label={tabs[item]} value={item} />)
          }
        </Tabs>
        <List>
          {
            topicList.map(topic => <TopicListItem key={topic.id} onClick={this.listItemClick} topic={topic} />)
          }
        </List>
        {
          syncingTopics
            ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  padding: '40px 0',
                }}
              >
                <CircularProgress color="primary" size={100} />
              </div>)
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

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
};
