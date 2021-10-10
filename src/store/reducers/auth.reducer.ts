import { Action, Reducer } from "redux";

/** Authorization interface */
export interface AuthInterface {
  token: string
}

/** Authorization action types */
export enum authActionTypes {
  /**user login */
  AUTH_LOGIN = 'auth/login',
  /**user logout */
  AUTH_LOGOUT = 'auth/logout',
  /**user authentication*/
  AUTH_ME = 'auth/me'
};

/** Authorization login action interface */
export interface AUTH_LOGIN_ACTION
  extends Action<authActionTypes.AUTH_LOGIN> {
  payload: AuthInterface
};

/** Authorization logout action interface */
export interface AUTH_LOGOUT_ACTION
  extends Action<authActionTypes.AUTH_LOGOUT> { };

/** Authentication action interface */
export interface AUTH_ME extends Action<authActionTypes.AUTH_ME> {
  payload: AuthInterface
};

/** Authentication action overloaded type */
export type AuthAction = AUTH_LOGIN_ACTION | AUTH_LOGOUT_ACTION | AUTH_ME;

/** Authorization state type */
type AuthState = AuthInterface | null;

/** Authorization initial state */
const initialState: AuthState = null;

/** Authorization reducer */
export const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_LOGIN:
      return action.payload
    case authActionTypes.AUTH_LOGOUT:
      return null
    case authActionTypes.AUTH_ME:
      return action.payload
    default:
      return state
  }
}