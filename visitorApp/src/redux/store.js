// import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from './middleware';
import { logger } from 'redux-logger';
import rootReducer from './allReducers';

// const asyncDispatchMiddleware = store => next => action => {
//   let syncActivityFinished = false;
//   let actionQueue = [];

//   function flushQueue() {
//     actionQueue.forEach(a => store.dispatch(a)); // flush queue
//     actionQueue = [];
//   }

//   function asyncDispatch(asyncAction) {
//     actionQueue = actionQueue.concat([asyncAction]);

//     if (syncActivityFinished) {
//       flushQueue();
//     }
//   }

//   const actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch });

//   const res = next(actionWithAsyncDispatch);

//   syncActivityFinished = true;
//   flushQueue();

//   return res;
// };

const middlewares = [thunk, api];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const configureStore = initialState => {
  const composeEnhancers =
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
};

export default configureStore;
