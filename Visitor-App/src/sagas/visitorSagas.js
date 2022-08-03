import { put, call, all, fork, takeLatest } from "redux-saga/effects";
import { VisitorActions, AuthActions } from "../actions";
import { GET, POST } from "../api";
import idx from "idx";

function* visitorList(action) {
  yield put(VisitorActions.visitorListRequest());
  try {
    const visitorListURL = "/visitor";
    const { response } = yield call(GET, visitorListURL);
    yield put(
      VisitorActions.visitorListSuccess({
        allVisitors: response.data
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.message) {
      msgError = error.message;
    }
    yield put(VisitorActions.visitorListFailure(msgError));
  }
}

function* visitorEntry(action) {
  yield put(VisitorActions.visitorEntryRequest());
  try {
    const visitorListURL = "/visitor";
    yield call(POST, visitorListURL, action.payload);
    yield put(VisitorActions.visitorEntrySuccess());
  } catch (error) {
    let msgError = error;
    if (error.message) {
      msgError = error.message;
    }
    yield put(VisitorActions.visitorEntryFailure(msgError));
  }
}

// function* vendorEntry(action) {
//   yield put(VisitorActions.visitorEntryRequest());
//   try {
//     const visitorListURL = "/visitor";
//     yield call(POST, visitorListURL, action.payload);
//     yield put(VisitorActions.visitorEntrySuccess());
//   } catch (error) {
//     let msgError = error;
//     if (error.message) {
//       msgError = error.message;
//     }
//     yield put(VisitorActions.visitorEntryFailure(msgError));
//   }
// }

export default function* visitorSagas() {
  yield all([fork(takeLatest, VisitorActions.VISITOR_ENTRY, visitorEntry)]);
  yield all([fork(takeLatest, VisitorActions.VISITOR_LIST, visitorList)]);
}
