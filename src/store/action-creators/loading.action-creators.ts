import {
  loadingActionTypes,
  LOADING_TRUE_ACTION,
  LOADING_FALSE_ACTION
} from '../reducers/loading.reducer'

/**
 * 
 * @param flag defines return action
 * @returns LOADING_TRUE_ACTION or LOADING_FALSE_ACTION
 */
function setLoading(flag: boolean): LOADING_TRUE_ACTION | LOADING_FALSE_ACTION {
  return flag
    ? { type: loadingActionTypes.LOADING_TRUE }
    : { type: loadingActionTypes.LOADING_FALSE }
};

export { setLoading }