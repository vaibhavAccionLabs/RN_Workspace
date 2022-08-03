import * as TYPES from 'redux/types';
import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import visitor from './reducers/visitorReducer';
import createVisitor from './reducers/createVisitorReducer';
import ownerDetails from './reducers/getOwnerDetailsReducer';
import vendor from './reducers/vendorReducer';

const appReducer = combineReducers({
  auth,
  visitor,
  createVisitor,
  ownerDetails,
  vendor
  //nav
});

const rootReducer = (state, action) => {
  if (action.type === TYPES.SIGNOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
