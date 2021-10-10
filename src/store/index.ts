import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'

/** App store */
export const store = createStore(rootReducer, applyMiddleware(thunk))

/**
 * Typed dispatch
 * 
 * @see {@link [React-Redux](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-root-state-and-dispatch-types)}
 */
export type TypedDispatch = typeof store.dispatch