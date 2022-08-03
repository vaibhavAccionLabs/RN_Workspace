import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { UserActions } from "../actions";
import { GET, POST, PUT } from "../api";
import idx from "idx";
import { AsyncStorage } from "react-native";
import React from "react";

const getUser = state => state.auth;

function* userList(action) {
  yield put(UserActions.userListRequest());
  try {
    let orgID = "";
    const user = yield select(getUser);
    console.log(user, "22222")
    if (user !== undefined) {
      orgID = user.user._organisationId._id;
    } else {
      AsyncStorage.getItem("authState")
        .then(value => {
          if (value) {
            let data = JSON.parse(value);
            orgID = data.user._organisationId._id;
          }
        })
        .done();
    }
    const userListURL = `/users?filter[_organisationId]=${orgID}`;
    const { response } = yield call(GET, userListURL);
    yield put(
      UserActions.userListSuccess({
        allUsers: response.data
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.message) {
      msgError = error.message;
    }
    yield put(UserActions.userListFailure(msgError));
  }
}

export default function* userSagas() {
  yield all([fork(takeLatest, UserActions.USER_LIST, userList)]);
}
