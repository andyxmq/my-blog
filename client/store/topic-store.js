import {
  observable,
  // toJS,
  computed,
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

  @observable details;

  @observable syncing;

  constructor({ syncing = false, topics = [], details = [] } = {}) {
    this.syncing = syncing;
    this.details = details;
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

  @computed get detailMap() {
    return this.details.reduce((result, detail) => {
      result[detail.id] = detail;
      return result;
    }, {});
  }

  @action getTopicDetail(id) {
    return new Promise((resolve, reject) => {
      if (this.detailMap[id]) {
        resolve(this.detailMap[id]);
      } else {
        get(`topic/${id}`, {
          mdrender: false,
        }).then((resp) => {
          if (resp.success) {
            const topic = new Topic(createTopic(resp.data));
            this.details.push(topic);
            resolve(topic);
          } else {
            reject();
          }
        }).catch(reject);
      }
    });
  }
}

export default TopicStore;
