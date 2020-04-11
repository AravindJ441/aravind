import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderHide, LoaderShow } from "../reducers/loader/loader.actions";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let showLoader: boolean = true;
    if (req.params[Symbol.for("nonBlocking")]) {
      showLoader = false;
    } else {
      // console.log("loading", req.url, req.body);
    }
    showLoader && this._store.dispatch(new LoaderShow());
    return next.handle(req).pipe(finalize(() => {
      if (showLoader) {
        // console.log("un loading", req.url, req.body);
      }
      showLoader && this._store.dispatch(new LoaderHide());
    }));
  }
}
