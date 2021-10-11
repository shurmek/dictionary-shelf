import { Reducer, Action } from "redux";

/** Dictionary interface */
export interface DictionaryInterface {
  id: string,
  title: string,
  description: string,
  img: string
};

/** Dictionary state interface */
export interface DictionaryState {
  data: DictionaryInterface[],
  limit: number,
  total: number,
  currentPage: number
}

/** Dictionary action types interface */
export enum dictionaryActionTypes {
  /** Dictionary fetch */
  DICTIONARY_FETCH = 'dictionary/fetch',
  /** Dictionary add */
  DICTIONARY_ADD = 'dictionary/add',
  /** Dictionary search */
  DICTIONARY_SEARCH = 'dictionary/search',
  /** Dictionary remove */
  DICTIONARY_REMOVE = 'dictionary/remove',
  /**Dictionary clear */
  DICTIONARY_CLEAR = 'dictionary/clear'
};

/** Dictionary fetch action interface */
export interface DICTIONARY_FETCH_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_FETCH> {
  payload: DictionaryState
};

/** Dictionary add action interface */
export interface DICTIONARY_ADD_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_ADD> {
  payload: DictionaryInterface
};

/** Dictionary search action interface */
export interface DICTIONARY_SEARCH_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_SEARCH> {
  payload: DictionaryState
};

/** Dictionary remove action interface */
export interface DICTIONARY_REMOVE_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_REMOVE> {
  /** object link */
  payload: DictionaryInterface
};

/** Dictionary clear action interface */
export interface DICTIONARY_CLEAR_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_CLEAR> { };

/** Dictionary action overloaded type */
export type DictionaryAction = DICTIONARY_FETCH_ACTION |
  DICTIONARY_ADD_ACTION | DICTIONARY_SEARCH_ACTION |
  DICTIONARY_REMOVE_ACTION | DICTIONARY_CLEAR_ACTION;

/** Dictionary initial state */
const initialState: DictionaryState = {
  data: [],
  limit: 0,
  total: 0,
  currentPage: 0
};

/** Dictionary reducer */
export const dictionaryReducer: Reducer<DictionaryState, DictionaryAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case dictionaryActionTypes.DICTIONARY_FETCH:
        return {
          ...state,
          data: state.data.concat(action.payload.data)
        }
      case dictionaryActionTypes.DICTIONARY_SEARCH:
        return action.payload;
      case dictionaryActionTypes.DICTIONARY_ADD:
        return {
          ...state,
          data: [action.payload].concat(state.data)
        };
      case dictionaryActionTypes.DICTIONARY_REMOVE:
        return {
          ...state,
          data: state.data.splice(state.data.indexOf(action.payload), 1)
        }
      case dictionaryActionTypes.DICTIONARY_CLEAR:
        return initialState
      default:
        return state
    }
  };