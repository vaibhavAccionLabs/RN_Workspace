import { put, call, all, fork, takeLatest } from "redux-saga/effects";
import { NotificationActions } from "../actions";
import { GET, PUT } from "../api";
import idx from "idx";

function* getNotifications() {
  yield put(NotificationActions.getNotificationsRequest());
  try {
    const notificationsUrl = "/notifications";
    const { response } = yield call(GET, notificationsUrl);
    yield put(
      NotificationActions.getNotificationsSuccess({
        notifications: idx(response, _ => _.data.data)
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(NotificationActions.getNotificationsFailure(msgError));
  }
}

function* readNotification() {
  yield put(NotificationActions.readNotificationRequest());
  try {
    const readNotificationUrl = "/notifications";
    const { response } = yield call(PUT, readNotificationUrl);
    yield put(
      NotificationActions.readNotificationSuccess({
        notifications: idx(response, _ => _.data.data)
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(NotificationActions.readNotificationFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([
    fork(takeLatest, NotificationActions.GET_NOTIFICATIONS, getNotifications)
  ]);
  yield all([
    fork(takeLatest, NotificationActions.READ_NOTIFICATION, readNotification)
  ]);
}
