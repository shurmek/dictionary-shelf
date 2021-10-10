import { Reducer, Action } from "redux";

/** Dictionary interface */
export interface DictionaryInterface {
  id: string,
  title: string,
  description: string,
  img: string
};

/** Dictionary action types interface */
export enum dictionaryActionTypes {
  /** Dictionary fetch */
  DICTIONARY_FETCH = 'dictionary/fetch',
  /** Dictionary add */
  DICTIONARY_ADD = 'dictionary/add',
  /** Dictionary search */
  DICTIONARY_SEARCH = 'dictionary/search',
  /** Dictionary remove */
  DICTIONARY_REMOVE = 'dictionary/remove'
};

/** Dictionary fetch action interface */
export interface DICTIONARY_FETCH_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_FETCH> {
  payload: DictionaryInterface[]
};

/** Dictionary add action interface */
export interface DICTIONARY_ADD_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_ADD> {
  payload: DictionaryInterface
};

/** Dictionary search action interface */
export interface DICTIONARY_SEARCH_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_SEARCH> {
  payload: DictionaryInterface[]
};

/** Dictionary remove action interface */
export interface DICTIONARY_REMOVE_ACTION
  extends Action<dictionaryActionTypes.DICTIONARY_REMOVE> {
  /** object link */
  payload: DictionaryInterface
};

/** Dictionary action overloaded type */
export type DictionaryAction = DICTIONARY_FETCH_ACTION |
  DICTIONARY_ADD_ACTION | DICTIONARY_SEARCH_ACTION |
  DICTIONARY_REMOVE_ACTION;

/** Dictionary state type */
type DictionaryState = DictionaryInterface[];

/** Dictionary initial state */
const initialState: DictionaryState = [];

/** Dictionary reducer */
export const dictionaryReducer: Reducer<DictionaryState, DictionaryAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case dictionaryActionTypes.DICTIONARY_FETCH:
        return state.concat(action.payload);
      case dictionaryActionTypes.DICTIONARY_SEARCH:
        return action.payload;
      case dictionaryActionTypes.DICTIONARY_ADD:
        return [action.payload, ...state];
      case dictionaryActionTypes.DICTIONARY_REMOVE:
        return state.splice(state.indexOf(action.payload), 1);
      default:
        return state
    }
  };