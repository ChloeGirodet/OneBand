import { createStore, applyMiddleware, compose } from 'redux';

import reducer from '../reducers';
import userMiddleware from '../middlewares/userMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
    applyMiddleware(userMiddleware,
      ),
  );

const store = createStore(
    reducer,
    enhancers,
);

export default store;