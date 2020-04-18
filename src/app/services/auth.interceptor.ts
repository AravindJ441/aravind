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

  getWithAuthHeaders = (req) => {
    if (this.accessToken) {

      /* Pass on the cloned request instead of the original request. */
      return req.clone({
        headers: req.headers.set('token', this.accessToken),
      });
    }
    return req;
  }

  intercept = ((req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {


    return next.handle(this.getWithAuthHeaders(req)).pipe(
      catchError(error => {
        console.log(error);
        let formattedError = error.error;
        return observableThrowError(error);
      })
    );
  }).bind(this);
}
