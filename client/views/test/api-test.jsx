import React from 'react';
import axios from 'axios';

/* eslint-disable */
export default class TestApi extends React.Component {
  constructor() {
    super();
    this.getTopics = this.getTopics.bind(this);
  }

  getTopics() {
    axios.get('/api/topics')
    .then((resp)=> {
      console.log(resp)
    })
    .catch(err => console.log(err))
  }

  login() {
    axios.post("/api/user/login",{
      accessToken: '1231'
    }).then(resp=>{
      console.log(resp)
    }).catch(err => console.log(err))

  }

  markAll() {
    axios.post("/api/message/mark_all?needAccessTOken=true")
    .then(resp=>{
      console.log(resp)
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>
          topics
        </button>
        <button onClick={this.login}>
          login
        </button>
        <button onClick={this.markAll}>
          topics
        </button>
      </div>
    )
  }
}
/* eslint-enable */
