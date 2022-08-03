import ip from "icepick";
import { NotificationActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  notificationRequestStatus: null,
  notificationError: null,
  notifications: null,
  readNotificationStatus: null,
  readNotificationError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case NotificationActions.GET_NOTIFICATIONS_REQUEST:
      return ip.setIn(state, ["notificationRequestStatus"], requestStatus[0]);

    case NotificationActions.GET_NOTIFICATIONS_FAILURE:
      state = ip.setIn(state, ["notificationError"], action.payload);
      return ip.setIn(state, ["notificationRequestStatus"], requestStatus[1]);

    case NotificationActions.GET_NOTIFICATIONS_SUCCESS: {
      const { notifications } = action.payload;
      state = ip.setIn(state, ["notifications"], notifications);
      state = ip.setIn(state, ["notificationRequestStatus"], requestStatus[2]);
      return state;
    }
    case NotificationActions.READ_NOTIFICATION_REQUEST:
      return ip.setIn(state, ["readNotificationStatus"], requestStatus[0]);

    case NotificationActions.READ_NOTIFICATION_REQUEST_FAILURE:
      state = ip.setIn(state, ["readNotificationError"], action.payload);
      return ip.setIn(state, ["readNotificationStatus"], requestStatus[1]);

    case NotificationActions.READ_NOTIFICATION_REQUEST_SUCCESS: {
      const { notifications } = action.payload;
      state = ip.setIn(state, ["notifications"], notifications);
      state = ip.setIn(state, ["readNotificationStatus"], requestStatus[2]);
      return state;
    }
    default:
      return ip.setIn(state, ["notificationError"], null);
  }
}
