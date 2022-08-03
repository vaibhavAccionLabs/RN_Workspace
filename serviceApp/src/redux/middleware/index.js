import axios from 'axios';
//import * as TYPES from '../types';

export default ({ dispatch, getState }) => next => async action => {
  const { auth } = getState();
  // if (action.type !== TYPES.APIREQUEST) {
  //   return next(action);
  // }

  const {
    method,
    headers,
    endpoint,
    onsuccess,
    onerror,
    body,
    onRequestStart
  } = action.payload;
  try {
    const config = {
      method,
      headers
    };

    if (onRequestStart) {
      dispatch(onRequestStart({ request: true }));
    }

    const response = await axios.post(endpoint, body);

    // console.log('RESPONSE::', response);

    if (response.error) {
      dispatch(onerror(response.error));
    } else {
      dispatch(onsuccess(response.data, body));
    }
  } catch ({ message }) {
    dispatch(onerror(message));
  }
};
