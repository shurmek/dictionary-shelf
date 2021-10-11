import * as thunks from "../store/thunks";
import { useDispatch, useStore } from 'react-redux';
import { TypedDispatch, TypedGetState } from "../store";

function bindThunk(thunk: any, dispatch: TypedDispatch, getState: TypedGetState) {
  return function (...args: any) {
    return dispatch(thunk.apply(args, arguments))
  }
}

/**
 * NEED A REFACTORING !!!
 * 1. Move the all binding logic to util.file
 * 2. Define generic types and interfaces.
 * 3. Add injectable thunks validation
 */
export const useThunks = () => {
  const getState: TypedGetState = useStore().getState
  const dispatch: TypedDispatch = useDispatch()

  type keys = keyof typeof thunks
  const boundThunks: Partial<Record<keyof typeof thunks, any>> = {}

  for (let key in thunks) {
    const thunk = thunks[key as keys]
    boundThunks[key as keys] = bindThunk(thunk, dispatch, getState)
  }

  return boundThunks as Required<typeof boundThunks>
}