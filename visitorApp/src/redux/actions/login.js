import * as TYPES from 'redux/types';
import { API } from 'config';
import { Platform } from 'react-native';
import { POST, PUT } from 'core/services';
import { saveItem } from 'redux/localStorage';

import DeviceInfo from 'react-native-device-info';

const deviceId = DeviceInfo.getUniqueID();
const deviceType = Platform.OS;

export const authSuccess = payload => {
  saveItem('auth', JSON.stringify(payload));
  return {
    type: TYPES.AUTH_SUCCESS,
    payload
  };
};

export const authFail = msg => {
  return {
    type: TYPES.AUTH_ERROR,
    msg
  };
};

export const authRequest = () => {
  return {
    type: TYPES.AUTH_REQUEST
  };
};

const SendDeviceId = () => {
  const endPoint = `${API.rwa.devices}`;
  const bodyData = { deviceId, deviceType };
  PUT(endPoint, bodyData)
    .then(res => console.log('DEVICE RES', res))
    .catch(err => console.log('DEVICE ERR::', err));
};

const userLogIn = (endPoint, bodyData) => {
  return dispatch => {
    dispatch(authRequest());
    return POST(endPoint, bodyData)
      .then(res => {
        dispatch(authSuccess(res.data));
        dispatch(SendDeviceId());
      })
      .catch(err => {
        if (err) {
          dispatch(authFail(err.response.data));
        }
      });
  };
};

export const SignIn = (emailOrPhone, password, ipAddress) => (
  dispatch,
  getState
) => {
  const endPoint = `${API.rwa.login}`;
  const bodyData = { emailOrPhone, password, ipAddress };
  dispatch(userLogIn(endPoint, bodyData));
};
