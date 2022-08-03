// import * as TYPES from 'redux/types';
// import { API, JSON_HEADER } from 'config';
// import { Platform } from 'react-native';
// import { GET, POST, PUT } from 'core/services';
// import { saveItem } from 'redux/localStorage';

// import DeviceInfo from 'react-native-device-info';

// const deviceId = DeviceInfo.getUniqueID();
// const deviceType = Platform.OS;

// export const authSuccess = payload => {
//   saveItem('auth', JSON.stringify(payload));
//   return {
//     type: TYPES.AUTH_SUCCESS,
//     payload
//   };
// };

// export const authFail = msg => {
//   return {
//     type: TYPES.AUTH_ERROR,
//     msg
//   };
// };

// // export const SignIn = (emailOrPhone, password, ipAddress) => {
// //   let endpoint = `${API.rwa.login}`;
// //   return {
// //     type: TYPES.APIREQUEST,
// //     payload: {
// //       endpoint,
// //       method: 'POST',
// //       headers: JSON_HEADER,
// //       body: { emailOrPhone, password, ipAddress },
// //       onsuccess: authSuccess,
// //       onerror: authFail
// //     }
// //   };
// // };

// const SendDeviceId = () => {
//   const endPoint = `${API.rwa.devices}`;
//   const bodyData = { deviceId, deviceType };
//   PUT(endPoint, bodyData)
//     .then(res => console.log('DEVICE RES', res))
//     .catch(err => console.log('DEVICE ERR::', err));
// };

// export const SignIn = (emailOrPhone, password, ipAddress) => dispatch => {
//   const endPoint = `${API.rwa.login}`;
//   const bodyData = { emailOrPhone, password, ipAddress };

//   return POST(endPoint, bodyData)
//     .then(res => {
//       console.log('login success', res);
//       dispatch(authSuccess(res));
//       SendDeviceId();
//       /// send device uinque ID::
//       return res;
//     })
//     .catch(err => {
//       console.log('login err::', err);
//       dispatch(authFail(err));
//       return err;
//     });
// };
