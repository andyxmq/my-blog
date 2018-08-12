import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Button from 'material-ui/Button';
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
    return new Promise((resolve) => {
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
        <Button raised="true" color="secondary">
          this is a buttonaa
        </Button>
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
