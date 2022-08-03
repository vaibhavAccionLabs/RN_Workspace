import { createAction } from "redux-actions";

export const USER_LIST = "USER/USER_LIST";
export const USER_LIST_REQUEST ="USER/USER_LIST_REQUEST";
export const USER_LIST_SUCCESS ="USER/USER_LIST_SUCCESS";
export const USER_LIST_FAILURE ="USER/USER_LIST_FAILURE";

export const userList = createAction(USER_LIST);
export const userListRequest = createAction(USER_LIST_REQUEST);
export const userListSuccess = createAction(USER_LIST_SUCCESS);
export const userListFailure = createAction(USER_LIST_FAILURE);

