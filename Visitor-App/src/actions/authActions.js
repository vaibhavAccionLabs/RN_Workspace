import { createAction } from "redux-actions";

export const LOGIN = "AUTH/LOGIN";
export const LOGIN_REQUEST = "AUTH/LOGIN_REQUEST";
export const LOGIN_FAILURE = "AUTH/LOGIN_FAILURE";
export const LOGIN_SUCCESS = "AUTH/LOGIN_SUCCESS";

export const login = data => ({
    type: LOGIN,
    payload: data
});

export const loginRequest = ()=>({
    type: LOGIN_REQUEST
});
export const loginSuccess = ()=>({
    type: LOGIN_SUCCESS
});
export const loginFailure = ()=>({
    type: LOGIN_FAILURE
});



//createAction(LOGIN);
//export const login = createAction(LOGIN);
// export const loginRequest = createAction(LOGIN_REQUEST);
// export const loginFailure = createAction(LOGIN_FAILURE);
// export const loginSuccess = createAction(LOGIN_SUCCESS);

export const UPDATE_PASSWORD = "AUTH/UPDATE_PASSWORD";
export const UPDATE_PASSWORD_REQUEST = "AUTH/UPDATE_PASSWORD_REQUEST";
export const UPDATE_PASSWORD_FAILURE = "AUTH/UPDATE_PASSWORD_FAILURE";
export const UPDATE_PASSWORD_SUCCESS = "AUTH/UPDATE_PASSWORD_SUCCESS";

export const updatePassword = createAction(UPDATE_PASSWORD);
export const updatePasswordRequest = createAction(UPDATE_PASSWORD_REQUEST);
export const updatePasswordFailure = createAction(UPDATE_PASSWORD_FAILURE);
export const updatePasswordSuccess = createAction(UPDATE_PASSWORD_SUCCESS);

// State for REGISTER process
export const REGISTER = "AUTH/REGISTER";
export const REGISTER_REQUEST = "AUTH/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "AUTH/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "AUTH/REGISTER_FAILURE";

export const register = createAction(REGISTER);
export const registerRequest = createAction(REGISTER_REQUEST);
export const registerSuccess = createAction(REGISTER_SUCCESS);
export const registerFailure = createAction(REGISTER_FAILURE);

export const SET_AUTH_USER = "AUTH/SET_AUTH_USER";
export const setAuthUser = createAction(SET_AUTH_USER);

export const UPDATE_AUTH_USER = "AUTH/UPDATE_AUTH_USER";
export const updateAuthUser = createAction(UPDATE_AUTH_USER);

// State for update user
export const UPDATE_USER = "AUTH/UPDATE_USER";
export const UPDATE_USER_REQUEST = "AUTH/UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "AUTH/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "AUTH/UPDATE_USER_FAILURE";

export const updateUser = createAction(UPDATE_USER);
export const updateUserRequest = createAction(UPDATE_USER_REQUEST);
export const updateUserFailure = createAction(UPDATE_USER_FAILURE);
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS);

export const LOGOUT = "AUTH/LOGOUT";
export const logout = createAction(LOGOUT);
