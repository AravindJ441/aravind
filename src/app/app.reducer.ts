import { LoaderState, reducer as loaderReducer } from "./reducers/loader/loader.reducer";

export interface AppState {
    loader: LoaderState,
}

export const reducer = {
    loader: loaderReducer,
}