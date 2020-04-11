import { Action } from "@ngrx/store";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AppGlobalActionTypes {
  InvalidSession = "[AppGlobal] InvalidSession",
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class InvalidSessionAction implements Action {
  readonly type = AppGlobalActionTypes.InvalidSession;
  constructor() {}
}
