import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers";

/**
 * Typed Selector hook
 * 
 * More about this hook and the recipe.
 * @see {@link[React-Redux](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks)}
 */
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector