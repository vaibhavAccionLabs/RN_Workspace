import { put, call, all, fork, takeLatest, select } from "redux-saga/effects";
import { AuthActions } from "../actions";
import { POST, PUT } from "../api";
import idx from "idx";
import { AsyncStorage } from "react-native";

function* doLogin(action) {
  yield put(AuthActions.loginRequest());
  try {
    const loginURL = "/auth/signin";
    const { response } = yield call(POST, loginURL, action.payload);
    console.log(response, "login");
    yield put(AuthActions.loginSuccess());
    AsyncStorage.setItem("authState", idx(response, _ => _.data.userObj));
    yield put(
      AuthActions.setAuthUser({
        user: idx(response, _ => _.data.userObj),
        token: idx(response, _ => _.data.token)
      })
    );
  } catch (error) {
    let msgError = error.message;
    // if (error.data) {
    //   msgError = error.data.error.message;
    // }
    yield put(AuthActions.loginFailure(msgError));
  }
}

const getUser = state => state.auth.user;

function* updateUser(action) {
  const user = yield select(getUser);
  yield put(AuthActions.updateUserRequest());
  try {
    const updateUserUrl = `/customers/${user._id}`;
    const { phone, profileImageUrl } = action.payload;
    const { response } = yield call(PUT, updateUserUrl, action.payload);
    yield put(
      AuthActions.updateUserSuccess({
        updatedUser: idx(response, _ => _.data.data)
      })
    );
    user.phone = phone;
    // user.email = email;
    user.profileImageUrl = profileImageUrl;
    yield put(
      AuthActions.updateAuthUser({
        user
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = idx(error, _ => _.data.error.message) || error.statusText;
    }
    yield put(AuthActions.updateUserFailure(msgError));
  }
}

export default function* authSagas() {
  yield all([fork(takeLatest, AuthActions.LOGIN, doLogin)]);
  yield all([fork(takeLatest, AuthActions.UPDATE_USER, updateUser)]);
}
