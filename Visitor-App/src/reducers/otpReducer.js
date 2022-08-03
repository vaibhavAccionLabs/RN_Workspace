import ip from "icepick";
import { OTPActions, AuthActions } from "../actions";

const requestStatus = ["REQUESTING", "FAILED", "SUCCESS"];
const initialState = {
  isOTPVerified: false,
  verifyOTPRequestStatus: null,
  verifyOTPError: null,
  resendOTPRequestStatus: null,
  resendOTPError: null,
  isPasswordUpdated: false,
  updatePasswordRequestStatus: null,
  updatePasswordError: null,
  forgotPasswordRequestStatus: null,
  forgotPasswordError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OTPActions.VERIFY_OTP_REQUEST:
      state = ip.setIn(state, ["verifyOTPError"], null);
      return ip.setIn(state, ["verifyOTPRequestStatus"], requestStatus[0]);

    case OTPActions.VERIFY_OTP_FAILURE:
      state = ip.setIn(state, ["verifyOTPError"], action.payload);
      return ip.setIn(state, ["verifyOTPRequestStatus"], requestStatus[1]);

    case OTPActions.VERIFY_OTP_SUCCESS:
      state = ip.setIn(state, ["isOTPVerified"], true);
      return ip.setIn(state, ["verifyOTPRequestStatus"], requestStatus[2]);

    case OTPActions.RESEND_OTP_REQUEST:
      state = ip.setIn(state, ["resendOTPError"], null);
      return ip.setIn(state, ["resendOTPRequestStatus"], requestStatus[0]);

    case OTPActions.RESEND_OTP_FAILURE:
      state = ip.setIn(state, ["resendOTPError"], action.payload);
      return ip.setIn(state, ["resendOTPRequestStatus"], requestStatus[1]);

    case OTPActions.RESEND_OTP_SUCCESS:
      return ip.setIn(state, ["resendOTPRequestStatus"], requestStatus[2]);

    case AuthActions.UPDATE_PASSWORD_REQUEST:
      state = ip.setIn(state, ["updatePasswordError"], null);
      return ip.setIn(state, ["updatePasswordRequestStatus"], requestStatus[0]);

    case AuthActions.UPDATE_PASSWORD_FAILURE:
      state = ip.setIn(state, ["updatePasswordError"], action.payload);
      return ip.setIn(state, ["updatePasswordRequestStatus"], requestStatus[1]);

    case AuthActions.UPDATE_PASSWORD_SUCCESS:
      state = ip.setIn(state, ["isPasswordUpdated"], true);
      return ip.setIn(state, ["updatePasswordRequestStatus"], requestStatus[2]);

    case OTPActions.REQUEST_FORGOT_PASSWORD_OTP_REQUEST:
      state = ip.setIn(state, ["forgotPasswordError"], null);
      return ip.setIn(state, ["forgotPasswordRequestStatus"], requestStatus[0]);

    case OTPActions.REQUEST_FORGOT_PASSWORD_OTP_FAILURE:
      state = ip.setIn(state, ["forgotPasswordError"], action.payload);
      return ip.setIn(state, ["forgotPasswordRequestStatus"], requestStatus[1]);

    case OTPActions.REQUEST_FORGOT_PASSWORD_OTP_SUCCESS: {
      state = ip.setIn(state, ["isOTPVerified"], false);
      state = ip.setIn(state, ["isPasswordUpdated"], false);
      return ip.setIn(state, ["forgotPasswordRequestStatus"], requestStatus[2]);
    }

    default:
      state = ip.setIn(state, ["resendOTPRequestStatus"], null);
      state = ip.setIn(state, ["resendOTPError"], null);
      state = ip.setIn(state, ["updatePasswordError"], null);
      return state;
  }
}
