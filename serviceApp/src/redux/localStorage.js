import { AsyncStorage } from 'react-native';

export const saveItem = (item, val) => {
  AsyncStorage.setItem(item, val);
};

export const removeItem = item => {
  AsyncStorage.removeItem(item);
};

export const loadTokens = async () => {
  let auth;
  try {
    auth = await AsyncStorage.getItem('auth');
    // have to check expiry of token
    // if (auth && isAccessTokenExpired(auth)) {
    //   removeTokens();
    // }
    // console.log('AUTH DATA::', auth);
  } catch (err) {
    console.log(err);
  }
  return auth ? JSON.parse(auth) : null;
};
