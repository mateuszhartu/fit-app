import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const index = configureStore({
  reducer: rootReducer,
  middleware,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', async () => {
    const newRootReducer = await import('./rootReducer'); // eslint-disable-line global-require
    index.replaceReducer(newRootReducer.default);
  });
}

export type AppDispatch = typeof index.dispatch;

export default index;
