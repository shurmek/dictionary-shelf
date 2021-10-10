import { Reducer, Action } from "redux";

/** Loading action types */
export enum loadingActionTypes {
  /**set loading as true */
  LOADING_TRUE = 'loading/true',
  /**set loading as false */
  LOADING_FALSE = 'loading/false'
};

/** Loading true action interface */
export interface LOADING_TRUE_ACTION
  extends Action<loadingActionTypes.LOADING_TRUE> { };

/** Loading false action interface */
export interface LOADING_FALSE_ACTION
  extends Action<loadingActionTypes.LOADING_FALSE> { };

/** Loading action overloaded type */
export type LoadingAction = LOADING_TRUE_ACTION | LOADING_FALSE_ACTION;

/** Loading state type */
export type LoadingState = boolean;

/** Loading initial state */
const initialState: LoadingState = false;

/** Loading reducer */
export const loadingReducer: Reducer<LoadingState, LoadingAction> =
  (state = initialState, action) => {
    switch (action.type) {
      case loadingActionTypes.LOADING_TRUE:
        return true
      case loadingActionTypes.LOADING_FALSE:
        return false
      default:
        return state
    }
  };