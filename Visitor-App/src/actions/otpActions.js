import { createAction } from "redux-actions";

export const VERIFY_OTP = "OTP/VERIFY_OTP";
export const VERIFY_OTP_REQUEST = "OTP/VERIFY_OTP_REQUEST";
export const VERIFY_OTP_FAILURE = "OTP/VERIFY_OTP_FAILURE";
export const VERIFY_OTP_SUCCESS = "OTP/VERIFY_OTP_SUCCESS";

export const verifyOTP = createAction(VERIFY_OTP);
export const verifyOTPRequest = createAction(VERIFY_OTP_REQUEST);
export const verifyOTPFailure = createAction(VERIFY_OTP_FAILURE);
export const verifyOTPSuccess = createAction(VERIFY_OTP_SUCCESS);

export const RESEND_OTP = "OTP/RESEND_OTP";
export const RESEND_OTP_REQUEST = "OTP/RESEND_OTP_REQUEST";
export const RESEND_OTP_FAILURE = "OTP/RESEND_OTP_FAILURE";
export const RESEND_OTP_SUCCESS = "OTP/RESEND_OTP_SUCCESS";

export const resendOTP = createAction(RESEND_OTP);
export const resendOTPRequest = createAction(RESEND_OTP_REQUEST);
export const resendOTPFailure = createAction(RESEND_OTP_FAILURE);
export const resendOTPSuccess = createAction(RESEND_OTP_SUCCESS);

export const REQUEST_FORGOT_PASSWORD_OTP = "OTP/REQUEST_FORGOT_PASSWORD_OTP";
export const REQUEST_FORGOT_PASSWORD_OTP_REQUEST =
  "OTP/REQUEST_FORGOT_PASSWORD_OTP_REQUEST";
export const REQUEST_FORGOT_PASSWORD_OTP_FAILURE =
  "OTP/REQUEST_FORGOT_PASSWORD_OTP_FAILURE";
export const REQUEST_FORGOT_PASSWORD_OTP_SUCCESS =
  "OTP/REQUEST_FORGOT_PASSWORD_OTP_SUCCESS";

export const requestForgotPasswordOTP = createAction(
  REQUEST_FORGOT_PASSWORD_OTP
);
export const requestForgotPasswordOTPRequest = createAction(
  REQUEST_FORGOT_PASSWORD_OTP_REQUEST
);
export const requestForgotPasswordOTPFailure = createAction(
  REQUEST_FORGOT_PASSWORD_OTP_FAILURE
);
export const requestForgotPasswordOTPSuccess = createAction(
  REQUEST_FORGOT_PASSWORD_OTP_SUCCESS
);
