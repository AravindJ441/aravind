import { Component, Inject, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap, map } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'ngw-loader',
  template: `
    <ng-container *ngIf="loader$ | async as show">
    <div class="cssload-container">
      <div class="cssload-zenith">
        <img src="assets/images/loading.gif">
      </div>
      <div class="load-text">
        <p class="bold">A moment to unwind, as we connect...</p>
      </div>
    </div>
    </ng-container>
  `,
  styleUrls: ['./loader.style.scss'],
})
export class Loader {
  public loader$;
  constructor(
    private _store: Store<AppState>,
    @Inject(DOCUMENT) private _document: Document,
    private _renderer: Renderer2
  ) {
    this.loader$ = this._store.select(state => state.loader.loading).pipe(
      // .debounceTime(300)
      map(loading => loading > 0),
      tap(loading => {
        if (loading) {
          this._renderer.addClass(this._document.body, 'overlay');
          // TODO
        } else {
          // remove body class
          this._renderer.removeClass(this._document.body, 'overlay');
        }
      })
    );
  }
}
