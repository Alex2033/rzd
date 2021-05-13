import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { AuthDataInterface } from '../types/auth.interface';
import { SmsConfirmInterface } from '../types/sms-confirm.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get token(): string {
    const expDate = new Date(localStorage.getItem('rzd-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('rzd-token');
  }

  constructor(private http: HttpClient) {}

  register(data: AuthDataInterface): Observable<{}> {
    return this.http.post<{}>(environment.api + 'api/account/register', data);
  }

  confirmInvite(data: SmsConfirmInterface): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        environment.api + 'api/account/confirm_invite',
        data
      )
      .pipe(tap(this.setToken));
  }

  reInvite(phone: string): Observable<{}> {
    return this.http.post<{}>(environment.api + 'api/account/reinvite', {
      phone,
    });
  }

  login(phone: string): Observable<{}> {
    return this.http.post<{}>(environment.api + 'api/account/login', { phone });
  }

  confirmLogin(data: SmsConfirmInterface): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        environment.api + 'api/account/confirm_login',
        data
      )
      .pipe(tap(this.setToken));
  }

  private setToken(res: AuthResponseInterface | null): void {
    if (res) {
      const expDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('rzd-token', res.token);
      localStorage.setItem('rzd-token-exp', expDate.toString());
    } else {
      localStorage.removeItem('rzd-token');
      localStorage.removeItem('rzd-token-exp');
    }
  }

  logout(): void {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }
}
