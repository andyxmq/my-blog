import AppStateClass from './app-state';

export const AppState = AppStateClass;

export default {
  AppState,
};

// 创建
export const createStoreMap = () => ({
  appState: new AppState(),
});
