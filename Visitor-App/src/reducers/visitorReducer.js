import ip from "icepick";
import { VisitorActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  visitorListRequestStatus: null,
  visitorListError: null,
  visitorEntryRequestStatus: null,
  visitorEntryError: null,
  allVisitors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case VisitorActions.VISITOR_ENTRY_REQUEST:
      state = ip.setIn(state, ["visitorEntryError"], null);
      return ip.setIn(state, ["visitorEntryRequestStatus"], requestStatus[0]);

    case VisitorActions.VISITOR_ENTRY_FAILURE:
      state = ip.setIn(state, ["visitorEntryError"], action.payload);
      return ip.setIn(state, ["visitorEntryRequestStatus"], requestStatus[1]);

    case VisitorActions.VISITOR_ENTRY_SUCCESS:
      state = ip.setIn(state, ["visitorEntryError"], true);
      return ip.setIn(state, ["visitorEntryRequestStatus"], requestStatus[2]);

    case VisitorActions.VISITOR_LIST_REQUEST:
      state = ip.setIn(state, ["visitorListError"], null);
      return ip.setIn(state, ["visitorListRequestStatus"], requestStatus[0]);

    case VisitorActions.VISITOR_LIST_FAILURE:
      state = ip.setIn(state, ["visitorListError"], action.payload);
      return ip.setIn(state, ["visitorListRequestStatus"], requestStatus[1]);

    case VisitorActions.VISITOR_LIST_SUCCESS:
      const { allVisitors } = action.payload;
      state = ip.setIn(state, ["allVisitors"], allVisitors);
      return ip.setIn(state, ["visitorListRequestStatus"], requestStatus[2]);

    default:
      return state;
  }
}
