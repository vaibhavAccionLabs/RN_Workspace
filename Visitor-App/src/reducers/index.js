import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { AuthActions } from "../actions";
import loginReducer from "./loginReducer";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";
import notificationReducer from "./notificationReducer";
import visitorReducer from "./visitorReducer";
import userReducer from "./userReducer";

const appReducer = combineReducers({
  form: formReducer,
  login: loginReducer,
  auth: authReducer,
  register: registerReducer,
  notification: notificationReducer,
  visitor: visitorReducer,
  user: userReducer
});

const rootReducer = (state, action) => {
  if (action.type === AuthActions.LOGOUT) {
    state = { login: state.login };
  }

  return appReducer(state, action);
};

export default rootReducer;
