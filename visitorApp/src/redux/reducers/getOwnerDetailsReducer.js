import * as TYPES from 'redux/types';
import { API } from 'config';
import { POST, GETNEW } from 'core/services';
import {
  getOwnerDetailsRequest,
  getOwnerDetailsSuccess,
  getOwnerDetailsError,
  resetOwnerDetailsError
} from '../actions/owner';
const initialState = {
  request: null,
  error: null,
  owner: null,
  message: null
};

const getOwnerDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_OWNER_REQUEST:
      return {
        ...state,
        request: true
      };

    case TYPES.GET_OWNER_SUCCESS:
      return {
        ...state,
        owner: action.payload,
        request: false,
        error: false
      };

    case TYPES.GET_OWNER_ERROR:
      return {
        ...state,
        error: true,
        request: false,
        message: action.message.message
      };

    case TYPES.RESET_OWNER_DETAILS:
      return {
        ...state,
        error: false,
        request: false,
        message: null,
        owner: null
      };

    default:
      return state;
  }
};

export default getOwnerDetailsReducer;

export const fetchOwnerDetails = (block, apartment) => (dispatch, getState) => {
  const endpoint = `${
    API.rwa.apartments
  }?filter[block]=${block}&filter[flatNo]=${apartment}&with[owners]=userType,name`;

  dispatch(getOwnerDetailsRequest());
  GETNEW(endpoint)
    .then(res => {
      if (res && res.data) {
        dispatch(getOwnerDetailsSuccess(res.data));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(getOwnerDetailsError(err.data));
    });
};
