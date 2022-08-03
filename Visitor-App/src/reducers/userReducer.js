import ip from "icepick";
import { UserActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  userRequestStatus: null,
  userError: null,
  allUsers: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UserActions.USER_LIST_REQUEST:
      return ip.setIn(state, ["userRequestStatus"], requestStatus[0]);

    case UserActions.USER_LIST_FAILURE:
      state = ip.setIn(state, ["userError"], action.payload);
      return ip.setIn(state, ["userRequestStatus"], requestStatus[1]);

    case UserActions.USER_LIST_SUCCESS:
      const { allUsers } = action.payload;
      state = ip.setIn(state, ["allUsers"], allUsers);
      return ip.setIn(state, ["userRequestStatus"], requestStatus[2]);

    default:
      return state;
  }
}
