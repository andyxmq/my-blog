import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppState from '../../store/app-state';
import Container from '../layout/container';

@inject('appState')
@observer
export default class TopicList extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
    this.changeTab = this.changeTab.bind(this);
  }

  componentDidMount() {
    // dosomething
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


  render() {
    const {
      tabIndex,
    } = this.state;
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
      </Container>
    );
  }
}

// TopicList.propTypes = {
//   appState: PropTypes.instanceOf(new AppState()),
// };
