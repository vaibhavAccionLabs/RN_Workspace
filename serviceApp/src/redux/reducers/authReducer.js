// authReducer.js
// import * as TYPES from '././types';
// import { setAuthHeaders } from 'core/services';

const initialState = {
  token: null
};
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      if (action && action.payload) {
        return {
          ...state,
          token: action.payload.token
        };
      }
    default:
      return state;
  }
};

export default authReducer;
