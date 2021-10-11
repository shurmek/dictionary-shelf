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
export const dictionaryFetchThunk = () =>
  async (dispatch: TypedDispatch, getState: TypedGetState) => {

    const { auth, dictionary } = getState();
    const currentPage = ++dictionary.currentPage;
    const limit = dictionary.limit || 100;

    if (dictionary.total && currentPage > Math.ceil(dictionary.total / limit)) return

    dispatch(setLoading(true))

    requestUtil({
      url: '/dictionaries',
      params: {
        _page: String(currentPage),
        _limit: String(limit)
      },
      headers: {
        'Authentication': `Bearer ${auth?.token}`
      }
    })<DictionaryInterface[]>(
      ({ data, headers }) => {
        dispatch(dictionaryFetch({
          data,
          currentPage,
          limit,
          total: Number(headers['x-total-count'])
        }))
      },
      ({ data }) => dispatch(notificationShow(data.message, "warning")),
    ).finally(
      () => setLoading(false)
    )
  }

/**
 * Thunk to full text search dictionaries 
 * 
 * @param searchText text chunck serched on dictionaries
 * 
 * More about thunks - @see {@link[Redux](https://redux.js.org/usage/writing-logic-thunks)}
 */
export const dictionarySearchThunck = (searchText: string) =>
  async (dispatch: TypedDispatch, getState: TypedGetState) => {

    if (searchText.trim() === '') {
      dispatch(notificationShow("Поисковый запрос не может быть пустым"))
      return
    }

    const { auth, dictionary } = getState();
    const currentPage = 1;
    const limit = dictionary.limit || 100;

    dispatch(setLoading(true))

    requestUtil({
      url: '/dictionaries',
      params: {
        q: searchText,
        _page: String(currentPage),
        _limit: String(limit)
      },
      headers: {
        'Authentication': `Bearer ${auth?.token}`
      }
    })<DictionaryInterface[]>(
      ({ data, headers }) => {
        dispatch(dictionarySearch({
          data,
          currentPage,
          limit,
          total: Number(headers['x-total-count'])
        }))
      },
      ({ data }) => dispatch(notificationShow(data.message, "warning"))
    ).finally(
      () => setLoading(false)
    )
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
        'Authentication': `Bearer ${auth?.token}`
      }
    })<DictionaryInterface>(
      ({ data }) => {
        dispatch(dictionaryAdd(data))
        dispatch(notificationShow("Словарь успешно добавлен!", "success"))
      },
      ({ data }) => dispatch(notificationShow(data.message, "warning"))
    ).finally(
      () => setLoading(false)
    )
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
        'Authentication': `Bearer ${auth?.token}`
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
      ({ data }) => dispatch(notificationShow(data.message, "warning"))
    )
  }