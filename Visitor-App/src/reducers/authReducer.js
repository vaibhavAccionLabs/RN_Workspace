import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];

const initialState = {
  isAuthorizedUser: false,
  user: null,
  authToken: null,
  updateUserStatus: null,
  updateUserError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActions.SET_AUTH_USER: {
      const { user, token } = action.payload;
      state = ip.setIn(state, ["isAuthorizedUser"], true);
      state = ip.setIn(state, ["user"], user);
      state = ip.setIn(state, ["authToken"], token);
      return state;
    }

    case AuthActions.UPDATE_AUTH_USER: {
      const { user } = action.payload;
      state = ip.setIn(state, ["user"], user);
      return state;
    }

    case AuthActions.UPDATE_USER_REQUEST:
      state = ip.setIn(state, ["updateUserError"], null);
      return ip.setIn(state, ["updateUserStatus"], requestStatus[0]);

    case AuthActions.UPDATE_USER_FAILURE:
      state = ip.setIn(state, ["updateUserError"], action.payload);
      return ip.setIn(state, ["updateUserStatus"], requestStatus[1]);

    case AuthActions.UPDATE_USER_SUCCESS: {
      const { updatedUser } = action.payload;
      state = ip.setIn(state, ["updateUserStatus"], requestStatus[2]);
      return state;
    }

    case AuthActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
