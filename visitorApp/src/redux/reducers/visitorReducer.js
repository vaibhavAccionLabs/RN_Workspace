// Visitor Reducer
import * as TYPES from 'redux/types';
import { API } from 'config';
import { GETNEW } from 'core/services';
import {
  getVisitorListRequest,
  getVisitorListSuccess,
  getVisitorListError
} from '../actions/visitor';

const initialState = {
  request: null,
  error: null,
  visitorList: null,
  visitorPostDetails: null
};

const visitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_VISITORS_REQUEST:
      return {
        ...state,
        request: true
      };

    case TYPES.GET_VISITORS_SUCCESS:
      return {
        ...state,
        visitorList: action.payload.visitors,
        visitorCount: action.payload.count,
        error: false,
        request: false
      };

    case TYPES.GET_VISITORS_ERROR:
      return {
        ...state,
        error: true,
        request: false
      };

    case TYPES.COLLECT_VISITOR_DATA:
      return {
        ...state,
        visitorPostDetails: Object.assign(
          {},
          state.visitorPostDetails,
          action.payload
        )
      };
    case TYPES.RESET_COLLECT_VISITOR_DATA:
      return {
        ...state,
        visitorPostDetails: null
      };
    default:
      return state;
  }
};

export default visitorReducer;

// GET  visitorsList
export const fetchVisitors = () => (dispatch, getState) => {
  const endpoint = `${API.rwa.visitor}?filter[type]=visitor`;
  dispatch(getVisitorListRequest());
  GETNEW(endpoint)
    .then(res => {
      if (res && res.data) {
        dispatch(getVisitorListSuccess(res.data));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(getVisitorListError(err.data));
    });
};
