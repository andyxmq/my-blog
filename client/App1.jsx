import React from 'react';
import Counter from './topic-list/Counter.jsx';
import Input from './style-component/Input.jsx';
import Button from './style-component/Button.jsx';
import Link from './style-component/Link.jsx';
import Rotate from './style-component/Rotate.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // doSomething
  }

  render() {
    return (
      <div>
        aaaaccc
        <Counter />
        <Input />
        <Button />
        <Link />
        <Rotate />
      </div>
    );
  }
}
