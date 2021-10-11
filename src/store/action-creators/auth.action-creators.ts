import {
  authActionTypes,
  AuthInterface,
  AUTH_LOGIN_ACTION,
  AUTH_LOGOUT_ACTION,
  AUTH_ME
} from "../reducers/auth.reducer";

/** @returns auth login action */
export const authLogin = (payload: AuthInterface): AUTH_LOGIN_ACTION => ({
  type: authActionTypes.AUTH_LOGIN,
  payload
});

/** @returns auth logout action */
export const authLogout = (): AUTH_LOGOUT_ACTION => ({
  type: authActionTypes.AUTH_LOGOUT
});

/** @returns auth me action*/
export const authMe = (payload: AuthInterface): AUTH_ME => ({
  type: authActionTypes.AUTH_ME,
  payload
});