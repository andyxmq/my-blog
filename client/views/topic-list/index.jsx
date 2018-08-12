import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { resolve } from 'uri-js';
import Helmet from 'react-helmet';
import AppState from '../../store/app-state';

@inject('appState')
@observer
export default class TopicList extends React.Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    // dosomething
  }

  bootstrapper() {
    let that = this;
    return new Promise((resolve) => { // eslint-disable-line
      setTimeout(() => {
        that.props.appState.count = 3;
        resolve(true);
      }, 100);
    });
  }


  changeName(event) {
    this.props.appState.changeName(event.target.value);
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>
            this is topic list
          </title>
          <meta name="discription" content="this is description" />
        </Helmet>
        <input type="text" onChange={this.changeName} />
        <span>
          {this.props.appState.msg}
        </span>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(new AppState()),
};
