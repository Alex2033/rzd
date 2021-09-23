import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../../shared/services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private account: AccountService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.account.isAuth) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.account.token}`,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.account.logout();
          this.router.navigate(['/auth', 'login']);
        }
        return throwError(error);
      })
    );
  }
}
