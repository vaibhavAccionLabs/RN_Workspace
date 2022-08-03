import * as TYPES from 'redux/types';
import { API } from 'config';
import { POST } from 'core/services';
import {
  createVisitorRequest,
  createVisitorSuccess,
  createVisitorError
} from '../actions/visitor';
const initialState = {
  request: null,
  error: null,
  visitor: null,
  message: null
};

const createVisitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATE_VISITOR_REQUEST:
      return {
        ...state,
        request: true
      };

    case TYPES.CREATE_VISITOR_SUCCESS:
      return {
        ...state,
        visitor: action.payload,
        request: false,
        error: false
      };

    case TYPES.CREATE_VISITOR_ERROR:
      return {
        ...state,
        error: true,
        request: false,
        message: action.message.message
      };
    case TYPES.RESET_CREATED_VISITOR_DATA:
      return {
        ...state,
        error: false,
        request: false,
        message: null,
        visitor: null
      };

    default:
      return state;
  }
};

export default createVisitorReducer;

const saveVisitor = (endPoint, body) => {
  return dispatch => {
    dispatch(createVisitorRequest());
    return POST(endPoint, body)
      .then(res => {
        dispatch(createVisitorSuccess(res.data));
      })
      .catch(err => {
        if (err) {
          dispatch(createVisitorError(err.response.data));
        }
      });
  };
};

export const postVisitor = (_apartmentId, selectedName) => (
  dispatch,
  getState
) => {
  const state = getState();
  const {
    auth: {
      user: { _associationId }
    }
  } = state;
  const {
    visitor: { visitorPostDetails }
  } = state;

  const body = Object.assign(
    {},
    visitorPostDetails,
    { _associationId },
    {
      whomToMeet: {
        _apartmentId: _apartmentId,
        name: selectedName
      },
      checkInAt: new Date(),
      vehicle: {
        type: 'car',
        regNumber: visitorPostDetails.regNumber
      }
    }
  );
  const endPoint = `${API.rwa.visitor}`;
  dispatch(saveVisitor(endPoint, body));
};
