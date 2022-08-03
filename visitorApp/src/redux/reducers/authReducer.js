// Auth Reducer
import * as TYPES from 'redux/types';
import { setAuthHeaders } from 'core/services';

const initialState = {
  token: null,
  user: null,
  error: null,
  request: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUTH_REQUEST:
      return {
        ...state,
        request: true
      };

    case TYPES.AUTH_SUCCESS:
      if (action && action.payload) {
        setAuthHeaders(action.payload.token.token);
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          request: false,
          error: false
        };
      }

    case TYPES.AUTH_ERROR:
      return {
        ...state,
        error: action.msg && action.msg.message,
        request: false
      };

    default:
      return state;
  }
};

export default authReducer;
