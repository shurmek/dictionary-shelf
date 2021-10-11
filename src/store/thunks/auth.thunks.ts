import { TypedDispatch } from "..";
import requestUtil from "../../utils/request.util";
import { authLogin, authLogout, authMe } from "../action-creators/auth.action-creators";
import { setLoading } from "../action-creators/loading.action-creators";
import { notificationShow } from "../action-creators/notification.action-creators";
import { dictionaryClear } from '../action-creators/dictionary.action-creators';
import { AuthInterface } from '../reducers/auth.reducer'

const USER_STORAGE = 'uid'

/** Authentication form data interface */
export interface AuthFormDataInterface {
  username: string,
  password: string
}

/**
 * Thunk to user login
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const authLoginThunk = (data: AuthFormDataInterface) =>
  async (dispatch: TypedDispatch) => {

    dispatch(setLoading(true))

    requestUtil<AuthFormDataInterface>({
      url: 'api/v1/auth/login',
      method: "POST",
      data
    })<AuthInterface>(
      ({ data }) => {
        dispatch(authLogin(data))
        localStorage.setItem(USER_STORAGE, data.token)
        dispatch(notificationShow('Добро пожаловать!', "success"))
      },
      ({ data }) => dispatch(notificationShow(data.message, "warning"))
    ).finally(
      () => dispatch(setLoading(false))
    )
  };

/**
 * Thunk to user logout
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const authLogoutThunk = () =>
  async (dispatch: TypedDispatch) => {
    dispatch(authLogout())
    dispatch(dictionaryClear())
    localStorage.removeItem(USER_STORAGE)
  }

/**
 * Thunk to user authorization
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const authMeThunk = () =>
  async (dispatch: TypedDispatch) => {
    dispatch(setLoading(true))

    const uid = localStorage.getItem(USER_STORAGE) as string

    requestUtil<AuthInterface>({
      url: 'api/v1/auth/me',
      method: "POST",
      data: { token: uid }
    })<AuthInterface>(
      ({ data }) => {
        dispatch(authMe(data))
        localStorage.setItem(USER_STORAGE, data.token)
        dispatch(notificationShow('Добро пожаловать!', "success"))
      },
      ({ data }) => dispatch(notificationShow(data.message, "warning"))
    ).finally(
      () => dispatch(setLoading(false))
    )
  }