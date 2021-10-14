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
  AUTH_LOGOUT = 'auth/logout'
};

/** Authorization login action interface */
export interface AUTH_LOGIN_ACTION
  extends Action<authActionTypes.AUTH_LOGIN> {
  payload: AuthInterface
};

/** Authorization logout action interface */
export interface AUTH_LOGOUT_ACTION
  extends Action<authActionTypes.AUTH_LOGOUT> { };

/** Authentication action overloaded type */
export type AuthAction = AUTH_LOGIN_ACTION | AUTH_LOGOUT_ACTION;

/** Authorization state type */
type AuthState = AuthInterface | null;


export const USER_STORAGE = 'uid'

const token = localStorage.getItem(USER_STORAGE)

/** Authorization initial state */
const initialState: AuthState = token ? { token } : null

/** Authorization reducer */
export const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.AUTH_LOGIN:
      return action.payload
    case authActionTypes.AUTH_LOGOUT:
      return null
    default:
      return state
  }
}