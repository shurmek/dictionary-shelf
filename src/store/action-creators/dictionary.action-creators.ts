import {
  dictionaryActionTypes,
  DictionaryInterface,
  DICTIONARY_FETCH_ACTION,
  DICTIONARY_ADD_ACTION,
  DICTIONARY_SEARCH_ACTION,
  DICTIONARY_REMOVE_ACTION,
  DICTIONARY_CLEAR_ACTION
} from '../reducers/dictionary.reducer'

/** @returns dictionary fetch action*/
export const dictionaryFetch = (payload: DictionaryInterface[]): DICTIONARY_FETCH_ACTION => ({
  type: dictionaryActionTypes.DICTIONARY_FETCH,
  payload
});

/** @returns dictionary add action*/
export const dictionaryAdd = (payload: DictionaryInterface): DICTIONARY_ADD_ACTION => ({
  type: dictionaryActionTypes.DICTIONARY_ADD,
  payload
});

/** @returns dictionary search action*/
export const dictionarySearch = (payload: DictionaryInterface[]): DICTIONARY_SEARCH_ACTION => ({
  type: dictionaryActionTypes.DICTIONARY_SEARCH,
  payload
});

/** @returns dictionary clear action*/
export const dictionaryClear = (): DICTIONARY_CLEAR_ACTION => ({
  type: dictionaryActionTypes.DICTIONARY_CLEAR
});

/** @returns dictionary renove action*/
export const dictionaryRemove = (payload: DictionaryInterface): DICTIONARY_REMOVE_ACTION => ({
  type: dictionaryActionTypes.DICTIONARY_REMOVE,
  payload
});