/** 纯前端相关 ，与业务无关 */
import {
  observable,
  action,
  toJS,
} from 'mobx';

import { post, get } from '../utils/http';

export default class Appstate {
  @observable user = {
    isLogin: false,
    info: {},
    detail: {
      recentTopics: [],
      recentReplies: [],
      syncing: false,
    },
    collections: {
      syncing: false,
      list: [],
    },
  };

  init({ user = null } = {}) {
    if (user) {
      this.user = user;
    }
  }

  @action login(accessToken) {
    let self = this;
    return new Promise((resolve, reject) => {
      post('user/login', {}, {
        accessToken,
      }).then((resp) => {
        if (resp.success) {
          self.user.info = resp.data;
          self.user.isLogin = true;
          resolve();
        } else {
          reject(resp);
        }
      }).catch(reject);
    });
  }

  @action getUserDetail() {
    let self = this;
    this.user.detail.syncing = true;
    return new Promise((resolve, reject) => {
      get(`user/${self.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            self.user.detail.recentReplies = resp.data.recent_topics;
            self.user.detail.recentTopics = resp.data.recent_replies;
            resolve();
          } else {
            reject();
          }
          self.user.detail.syncing = false;
        }).catch((error) => {
          self.user.detail.syncing = false;
          reject(error);
        });
    });
  }

  @action getUserCollection() {
    this.user.collections.syncing = true;
    let self = this;
    return new Promise((resolve, reject) => {
      get(`topic_collect/${self.user.info.loginname}`)
        .then((resp) => {
          if (resp.success) {
            self.user.collections.list = resp.data;
            resolve();
          } else {
            reject();
          }
          self.user.collections.syncing = false;
        }).catch((error) => {
          self.user.collections.syncing = false;
          reject(error);
        });
    });
  }

  toJson() {
    return {
      user: toJS(this.user),
    };
  }
}
