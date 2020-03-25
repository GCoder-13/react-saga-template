import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import rootReducer from '@/services/reducers';
import rootSaga from '@/services/sagas';

export const history = createBrowserHistory();

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [];

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const enhancers = composeEnhancers(
  applyMiddleware(...middlewares),
);

const store = createStore(rootReducer, enhancers);
sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('@/services/reducers', () => {
    // eslint-disable-next-line global-require
    const nextReducer = require('@/services/reducers').default;

    store.replaceReducer(nextReducer);
  });
}

export default store;
