import { createAction } from "redux-actions";

export const VISITOR_ENTRY = "VISITOR/VISITOR_ENTRY";
export const VISITOR_ENTRY_REQUEST = "VISITOR/VISITOR_ENTRY_REQUEST";
export const VISITOR_ENTRY_FAILURE = "VISITOR/VISITOR_ENTRY_FAILURE";
export const VISITOR_ENTRY_SUCCESS = "VISITOR/VISITOR_ENTRY_SUCCESS";

export const visitorEntry = createAction(VISITOR_ENTRY);
export const visitorEntryRequest = createAction(VISITOR_ENTRY_REQUEST);
export const visitorEntryFailure = createAction(VISITOR_ENTRY_FAILURE);
export const visitorEntrySuccess = createAction(VISITOR_ENTRY_SUCCESS);

export const VISITOR_LIST = "VISITOR/VISITOR_LIST";
export const VISITOR_LIST_REQUEST = "VISITOR/VISITOR_LIST_REQUEST";
export const VISITOR_LIST_FAILURE = "VISITOR/VISITOR_LIST_FAILURE";
export const VISITOR_LIST_SUCCESS = "VISITOR/VISITOR_LIST_SUCCESS";

export const visitorList = createAction(VISITOR_LIST);
export const visitorListRequest = createAction(VISITOR_LIST_REQUEST);
export const visitorListFailure = createAction(VISITOR_LIST_FAILURE);
export const visitorListSuccess = createAction(VISITOR_LIST_SUCCESS);

export const VENDOR_ENTRY = "VISITOR/VENDOR_ENTRY";
export const VENDOR_ENTRY_REQUEST = "VISITOR/VENDOR_ENTRY_REQUEST";
export const VENDOR_ENTRY_FAILURE = "VISITOR/VENDOR_ENTRY_FAILURE";
export const VENDOR_ENTRY_SUCCESS = "VISITOR/VENDOR_ENTRY_SUCCESS";

export const vendorEntry = createAction(VENDOR_ENTRY);
export const vendorEntryRequest = createAction(VENDOR_ENTRY_REQUEST);
export const vendorEntryFailure = createAction(VENDOR_ENTRY_FAILURE);
export const vendorEntrySuccess = createAction(VENDOR_ENTRY_SUCCESS);
