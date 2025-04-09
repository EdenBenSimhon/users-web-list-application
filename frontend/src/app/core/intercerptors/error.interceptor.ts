import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

export enum HttpErrorCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
}
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpErrorCode.Unauthorized:
            alert('Unauthorized access. Please log in again.');
            break;
          case HttpErrorCode.BadRequest:
            alert('Bad request. Please check your input.');
            break;
          case HttpErrorCode.NotFound:
            alert('Resource not found. Please check the URL.');
            break;
          case HttpErrorCode.InternalServerError:
            alert('Something went wrong. Please try again later.');
            break;
          default:
            alert(`Error: ${error.message}`);
        }

        return throwError(() => error);
      })
    );
  }
}
