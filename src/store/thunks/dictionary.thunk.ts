import { TypedDispatch, TypedGetState } from "..";
import requestUtil from "../../utils/request.util";
import {
  dictionaryAdd,
  dictionaryFetch,
  dictionaryRemove,
  dictionarySearch
} from '../action-creators/dictionary.action-creators';
import { setLoading } from "../action-creators/loading.action-creators";
import { notificationShow } from "../action-creators/notification.action-creators";
import { DictionaryInterface } from '../reducers/dictionary.reducer'

/**
 * Thunk to fetch dictionaries 
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const dictionaryFetchThunk = (searchText: string, isFirstRequest?: boolean) =>
  async (dispatch: TypedDispatch, getState: TypedGetState) => {

    const { auth, dictionary } = getState();

    const limit = dictionary.limit;
    const nextPage = isFirstRequest ? 1 : (Math.round(dictionary.data.length / limit)) + 1

    console.log(!!dictionary.total, nextPage, Math.ceil(dictionary.total / limit))

    if (!isFirstRequest && dictionary.data.length === dictionary.total) return

    dispatch(setLoading(true))

    const baseParams = {
      _page: String(nextPage),
      _limit: String(limit)
    }

    requestUtil({
      url: '/dictionaries',
      params: !!searchText?.trim() ? { 'q': searchText, ...baseParams } : baseParams,
      headers: {
        'Authorization': `Bearer ${auth?.token}`
      }
    })<DictionaryInterface[]>(
      ({ data, headers }) => {

        const action = (!!searchText.trim() && isFirstRequest) ? dictionarySearch : dictionaryFetch;

        dispatch(action({
          data,
          limit,
          total: Number(headers['x-total-count'])
        }))
      },
      ({ data }) => dispatch(notificationShow(data?.message || "Что-то пошло не так", "warning")),
    ).finally(() => dispatch(setLoading(false)))
  }

/**
 * Thunk to add a dictionary
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const dictionaryAddThunk = (data: Omit<DictionaryInterface, "id">) =>
  async (dispatch: TypedDispatch, getState: TypedGetState) => {
    const { auth } = getState();

    dispatch(setLoading(true));

    requestUtil({
      url: '/dictionaries',
      method: "POST",
      data,
      headers: {
        'Authorization': `Bearer ${auth?.token}`
      }
    })<DictionaryInterface>(
      ({ data }) => {
        dispatch(dictionaryAdd(data))
        dispatch(notificationShow("Словарь успешно добавлен!", "success"))
      },
      ({ data }) => dispatch(notificationShow(data?.message || "Что-то пошло не так", "warning"))
    ).finally(() => dispatch(setLoading(false)))
  }

/**
 * Thunk to remove a dictionary
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const dictionaryRemoveThunk = (data: DictionaryInterface) =>
  async (dispatch: TypedDispatch, getState: TypedGetState) => {
    const { auth } = getState();

    dispatch(setLoading(true));

    requestUtil({
      url: `/dictionaries/${data.id}`,
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${auth?.token}`
      }
    })(
      ({ status }) => {
        if (status !== 200) {
          dispatch(notificationShow("Произошла ошибка! Попробуйте позже", "error"))
          return
        }
        dispatch(dictionaryRemove(data))
        dispatch(notificationShow("Справочник удален!", "info"))
      },
      ({ data }) => dispatch(notificationShow(data?.message || "Что-то пошло не так", "warning"))
    )
      .finally(() => dispatch(setLoading(false)))
  }