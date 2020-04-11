import { Action } from "@ngrx/store";
import { HIDE_LOADER, SHOW_LOADER } from "./loader.actions";
export type LoaderState = {
  loading?: number;
};

export function reducer(
  state: LoaderState = { loading: 0 },
  action: Action
): LoaderState {
  switch (action.type) {
    case SHOW_LOADER:
      return Object.assign({}, state, { loading: state.loading + 1 });
    case HIDE_LOADER:
      return Object.assign({}, state, {
        loading: Math.max(state.loading - 1, 0),
      });
    default:
      return state;
  }
}
