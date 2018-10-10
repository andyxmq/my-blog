import AppState from './app-state';
import TopicStore from './topic-store';

export { AppState, TopicStore };

export default {
  AppState,
  TopicStore,
};

// 创建
export const createStoreMap = () => ({
  appState: new AppState(),
  topicStore: new TopicStore(),
});
