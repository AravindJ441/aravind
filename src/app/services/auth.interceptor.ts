import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServerURLInterceptor implements HttpInterceptor {
  private accessToken;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.accessToken = localStorage.getItem("token");
  }

  intercept = ((req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {

    /* Pass on the cloned request instead of the original request. */
    const authReq = req.clone({
      headers: req.headers.set('token', this.accessToken),
    });

    return next.handle(authReq).pipe(
      catchError(error => {
        console.log(error);
        let formattedError = error.error;
        return observableThrowError(error);
      })
    );
  }).bind(this);
}
