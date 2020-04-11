import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { AppGlobalActionTypes } from "./app.actions";
import { Router } from "@angular/router";
import { of as observableOf,  Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";

@Injectable()
export class AppGlobalEffects {
  @Effect({ dispatch: false })
  invalidSession$: Observable<void> = this.actions$
    .ofType(AppGlobalActionTypes.InvalidSession)
    .pipe(switchMap(action => {
      localStorage.removeItem('token');
      this._router.navigate(['403']);
      return observableOf();
    }));

  constructor(
    private actions$: Actions,
    private _router: Router
  ) {}
}

export const AppEffects = [
  AppGlobalEffects,
];
