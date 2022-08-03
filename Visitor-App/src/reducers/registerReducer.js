import ip from "icepick";
import { AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  registerRequestStatus: null,
  registerError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActions.REGISTER_REQUEST:
      return ip.setIn(state, ["registerRequestStatus"], requestStatus[0]);

    case AuthActions.REGISTER_FAILURE:
      state = ip.setIn(state, ["registerError"], action.payload);
      return ip.setIn(state, ["registerRequestStatus"], requestStatus[1]);

    case AuthActions.REGISTER_SUCCESS:
      return ip.setIn(state, ["registerRequestStatus"], requestStatus[2]);

    default:
      return state;
  }
}
