import { Action } from "@ngrx/store";

export const SHOW_LOADER = "[Loader] Show Loader";
export class LoaderShow implements Action {
  readonly type: string = SHOW_LOADER;
  constructor() {}
}

export const HIDE_LOADER = "[Loader] Hide Loader";
export class LoaderHide implements Action {
  readonly type: string = HIDE_LOADER;
  constructor() {}
}
