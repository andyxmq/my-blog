import {
  observable,
  // toJS,
  // computed,
  action,
  extendObservable,
} from 'mobx';

import { topicSchema } from '../utils/variable-define';
import { get } from '../utils/http';

const createTopic = topic => Object.assign({}, topicSchema, topic);
class Topic {
  constructor(data) {
    extendObservable(this, data);
  }

  @observable syncing = false ;
}

class TopicStore {
  @observable topics;

  @observable syncing;

  constructor({ syncing, topics } = { syncing: false, topics: [] }) {
    this.syncing = syncing;
    this.topics = topics.map(topic => new Topic(createTopic(topic)));
  }

  addTopic(topic) {
    this.topics.push(new Topic(createTopic(topic)));
  }

  // 获取topics数据
  @action fecthTopics(tab) {
    return new Promise((resolve, reject) => {
      this.syncing = true;
      this.topics = [];
      get('topics', {
        mdrender: false,
        tab,
      }).then((resp) => {
        if (resp.success) {
          resp.data.forEach((topic) => {
            this.addTopic(topic);
          });
          resolve();
        } else {
          reject();
        }
        this.syncing = false;
      }).catch((err) => {
        reject(err);
        this.syncing = false;
      });
    });
  }
}

export default TopicStore;
