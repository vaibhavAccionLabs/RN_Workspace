import { fork, all } from "redux-saga/effects";
import authSagas from "./authSagas";
import otpSagas from "./otpSagas";
import notificationSagas from "./notificationSagas";
import visitorSagas from "./visitorSagas";
import userSagas from "./userSagas";

export default function* sagas() {
  yield all([fork(authSagas)]);
  yield all([fork(otpSagas)]);
  yield all([fork(notificationSagas)]);
  yield all([fork(visitorSagas)]);
  yield all([fork(userSagas)]);
}
