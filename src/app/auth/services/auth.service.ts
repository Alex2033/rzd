import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../types/auth-response.interface';
import { AuthDataInterface } from '../types/auth.interface';
import { SmsConfirmInterface } from '../types/sms-confirm.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<AuthResponseInterface> =
    new BehaviorSubject<AuthResponseInterface>({} as AuthResponseInterface);

  get token(): string {
    const expDate = new Date(localStorage.getItem('rzd-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('rzd-token');
  }

  constructor(private http: HttpClient) {
    const savedUser: AuthResponseInterface = JSON.parse(
      localStorage.getItem('rzd-saved-user')
    );
    this.user$.next(savedUser);
  }

  register(data: AuthDataInterface): Observable<{}> {
    return this.http.post<{}>(environment.api + 'api/account/register', data);
  }

  confirmInvite(data: SmsConfirmInterface): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        environment.api + 'api/account/confirm_invite',
        data
      )
      .pipe(tap((res) => this.setUserSettings(res)));
  }

  reInvite(phone: string): Observable<void> {
    return this.http.post<void>(environment.api + 'api/account/reinvite', {
      phone,
    });
  }

  login(phone: string): Observable<void> {
    return this.http.post<void>(environment.api + 'api/account/login', {
      phone,
    });
  }

  confirmLogin(data: SmsConfirmInterface): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        environment.api + 'api/account/confirm_login',
        data
      )
      .pipe(tap((res) => this.setUserSettings(res)));
  }

  setUserSettings(res: AuthResponseInterface): void {
    this.user$.next(res);
    localStorage.setItem('rzd-saved-user', JSON.stringify(res));
    this.setToken(res);
  }

  setToken(res: AuthResponseInterface | null): void {
    if (res) {
      const expDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem('rzd-token', res.token);
      localStorage.setItem('rzd-token-exp', expDate.toString());
    } else {
      this.clearLocalStorage();
    }
  }

  clearLocalStorage(): void {
    localStorage.removeItem('rzd-saved-user');
    localStorage.removeItem('rzd-token');
    localStorage.removeItem('rzd-token-exp');
  }

  logout(): void {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  getUser(): Observable<AuthResponseInterface> {
    return this.user$.asObservable();
  }

  updateUser(user: AuthResponseInterface): Observable<void> {
    return this.http
      .post<void>(environment.api + 'api/account/update', user)
      .pipe(
        tap(() => {
          this.user$.next(user);
          localStorage.setItem('rzd-saved-user', JSON.stringify(user));
        })
      );
  }
}
