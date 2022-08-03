import { createAction } from "redux-actions";

export const GET_NOTIFICATIONS = "NOTIFICATIONS/GET_NOTIFICATIONS";
export const GET_NOTIFICATIONS_REQUEST =
  "NOTIFICATIONS/GET_NOTIFICATIONS_REQUEST";
export const GET_NOTIFICATIONS_SUCCESS =
  "NOTIFICATIONS/GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAILURE =
  "NOTIFICATIONS/GET_NOTIFICATIONS_FAILURE";

export const getNotifications = createAction(GET_NOTIFICATIONS);
export const getNotificationsRequest = createAction(GET_NOTIFICATIONS_REQUEST);
export const getNotificationsSuccess = createAction(GET_NOTIFICATIONS_SUCCESS);
export const getNotificationsFailure = createAction(GET_NOTIFICATIONS_FAILURE);

export const READ_NOTIFICATION = "NOTIFICATIONS/READ_NOTIFICATION";
export const READ_NOTIFICATION_REQUEST =
  "NOTIFICATIONS/READ_NOTIFICATION_REQUEST";
export const READ_NOTIFICATION_SUCCESS =
  "NOTIFICATIONS/READ_NOTIFICATION_SUCCESS";
export const READ_NOTIFICATION_FAILURE =
  "NOTIFICATIONS/READ_NOTIFICATION_FAILURE";

export const readNotification = createAction(READ_NOTIFICATION);
export const readNotificationRequest = createAction(READ_NOTIFICATION_REQUEST);
export const readNotificationSuccess = createAction(READ_NOTIFICATION_SUCCESS);
export const readNotificationFailure = createAction(READ_NOTIFICATION_FAILURE);
