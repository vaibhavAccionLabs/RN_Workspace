//import * as TYPES from './types';
import { combineReducers } from 'redux';
import auth from './reducers/authReducer';

const appReducer = combineReducers({
  auth
});

const rootReducer = (state, action) => {
  // if (action.type === TYPES.SIGNOUT) {
  //   state = undefined;
  // }
  return appReducer(state, action);
};

export default rootReducer;
