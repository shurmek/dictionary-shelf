import { TypedDispatch } from "..";
import requestUtil from "../../utils/request.util";
import { authLogin, authLogout } from "../action-creators/auth.action-creators";
import { setLoading } from "../action-creators/loading.action-creators";
import { notificationShow } from "../action-creators/notification.action-creators";
import { dictionaryClear } from '../action-creators/dictionary.action-creators';
import { AuthInterface, USER_STORAGE } from '../reducers/auth.reducer'


export enum AuthFormDataKeys {
  USERNAME = "username",
  PASSWORD = "password"
}

/** Authentication form data interface */
export interface AuthFormDataInterface
  extends Record<AuthFormDataKeys, string> { };

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
      ({ data }) => dispatch(notificationShow(data?.message || "Что-то пошло не так", "warning"))
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