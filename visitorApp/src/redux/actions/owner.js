import * as TYPES from 'redux/types';

export const getOwnerDetailsRequest = () => ({
  type: TYPES.GET_OWNER_REQUEST
});

export const getOwnerDetailsSuccess = payload => ({
  type: TYPES.GET_OWNER_SUCCESS,
  payload
});

export const getOwnerDetailsError = message => ({
  type: TYPES.GET_OWNER_ERROR,
  message
});

export const resetOwnerDetailsError = () => ({
  type: TYPES.RESET_OWNER_DETAILS
});
