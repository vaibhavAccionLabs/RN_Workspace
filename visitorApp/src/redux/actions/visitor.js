import * as TYPES from 'redux/types';

export const getVisitorListRequest = () => ({
  type: TYPES.GET_VISITORS_REQUEST
});

export const getVisitorListSuccess = payload => ({
  type: TYPES.GET_VISITORS_SUCCESS,
  payload
});

export const getVisitorListError = () => ({
  type: TYPES.GET_VISITORS_ERROR
});

export const collectVisitorData = (
  firstName,
  lastName,
  phone,
  email,
  regNumber,
  purpose
) => ({
  type: TYPES.COLLECT_VISITOR_DATA,
  payload: {
    _associationId: null,
    type: 'visitor',
    firstName,
    lastName,
    phone,
    email,
    regNumber,
    purpose
  }
});

export const createVisitorRequest = () => ({
  type: TYPES.CREATE_VISITOR_REQUEST
});

export const createVisitorSuccess = payload => ({
  type: TYPES.CREATE_VISITOR_SUCCESS,
  payload
});

export const createVisitorError = message => ({
  type: TYPES.CREATE_VISITOR_ERROR,
  message
});

export const resetCollectedVisitor = () => ({
  type: TYPES.TYPES.RESET_COLLECT_VISITOR_DATA
});

export const resetCreatedVisitor = () => ({
  type: TYPES.TYPES.RESET_CREATED_VISITOR_DATA
});
