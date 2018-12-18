import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const getEnhancers = () => {
  const middleware = applyMiddleware(reduxThunk);
  let composeEnhancers = (e) => e;

  if (process.env.NODE_ENV === 'development') {
    composeEnhancers =
      /* eslint-disable */
      typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
      /* eslint-disable */
  }

  return composeEnhancers(middleware);
}

export default ({ children }) => {
  const store = createStore(
    rootReducer,
    {},
    getEnhancers(),
  );
  
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
