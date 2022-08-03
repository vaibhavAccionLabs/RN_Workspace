import { put, call, all, fork, takeLatest } from "redux-saga/effects";
import { OTPActions, AuthActions } from "../actions";
import { GET, POST } from "../api";
import idx from "idx";

function* verifyOTP(action) {
  const { otp } = action.payload;
  yield put(OTPActions.verifyOTPRequest());
  try {
    const verifyOTPURL = `/customers/auth/activate/${otp}`;
    const { response } = yield call(GET, verifyOTPURL);
    yield put(OTPActions.verifyOTPSuccess());
    yield put(
      AuthActions.updateAuthUser({
        user: idx(response, _ => _.data.data)
      })
    );
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(OTPActions.verifyOTPFailure(msgError));
  }
}

function* resendOTP(action) {
  const { email } = action.payload;
  yield put(OTPActions.resendOTPRequest());
  try {
    const resendOTPURL = "/customers/auth/activate";
    yield call(POST, resendOTPURL, { email });
    yield put(OTPActions.resendOTPSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(OTPActions.resendOTPFailure(msgError));
  }
}

function* requestForgotPasswordOTP(action) {
  const { email } = action.payload;
  yield put(OTPActions.requestForgotPasswordOTPRequest());
  try {
    const requestForgotPasswordOTPUrl = `/customers/password/forgot/${email}`;
    yield call(GET, requestForgotPasswordOTPUrl);
    yield put(OTPActions.requestForgotPasswordOTPSuccess());
  } catch (error) {
    let msgError = error;
    if (error.data) {
      msgError = error.data.error.message;
    }
    yield put(OTPActions.requestForgotPasswordOTPFailure(msgError));
  }
}

export default function* otpSagas() {
  yield all([fork(takeLatest, OTPActions.VERIFY_OTP, verifyOTP)]);
  yield all([fork(takeLatest, OTPActions.RESEND_OTP, resendOTP)]);
  yield all([
    fork(
      takeLatest,
      OTPActions.REQUEST_FORGOT_PASSWORD_OTP,
      requestForgotPasswordOTP
    )
  ]);
}
