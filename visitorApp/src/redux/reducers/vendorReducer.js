// visitorEntryReducer.js
import * as TYPES from 'redux/types';

const initialState = {
  vendorData: null
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.VENDOR_ENTRY_SUCCESS:
      return {
        ...state,
        vendorData: action.payload.body,
      };

    default:
      return state;
  }
};

export default vendorReducer;
