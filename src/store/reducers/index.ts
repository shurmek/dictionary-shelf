import { combineReducers } from 'redux'
import { authReducer } from './auth.reducer'
import { dictionaryReducer } from './dictionary.reducer'
import { loadingReducer } from './loading.reducer'
import { notifiactionReducer } from './notification.reducer'

/**
 * Root reducer
 * @see {@link [Redux](https://redux.js.org/api/combinereducers)}
 */
export const rootReducer = combineReducers({
  auth: authReducer,
  dictionary: dictionaryReducer,
  loading: loadingReducer,
  notification: notifiactionReducer
});

/** 
 * Root state types from the store 
 * @see {@link [React-Redux](https://react-redux.js.org/tutorials/typescript-quick-start#define-root-state-and-dispatch-types)}
 */
export type RootState = ReturnType<typeof rootReducer>;