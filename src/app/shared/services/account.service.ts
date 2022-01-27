import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginDataInterface } from 'src/app/auth/types/login-data.interface';
import { PrepareRegisterInterface } from 'src/app/auth/types/prepare-register.interface';
import { environment } from 'src/environments/environment';
import { AuthResponseInterface } from '../../auth/types/auth-response.interface';
import { AuthDataInterface } from '../../auth/types/auth.interface';
import { CodeConfirmInterface } from '../../auth/types/code-confirm.interface';
import { CheckCodeDataInterface } from '../types/code-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
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

  register(data: AuthDataInterface): Observable<boolean> {
    console.log('data:', data);
    return this.http.post<boolean>(
      environment.api + 'api/account/register',
      data
    );
  }

  prepareRegister(data: PrepareRegisterInterface): Observable<string> {
    return this.http.post(
      environment.api + 'api/account/prepareRegister',
      data,
      { responseType: 'text' }
    );
  }

  prepareLogin(data: LoginDataInterface): Observable<string> {
    return this.http.post(environment.api + 'api/account/prepareLogin', data, {
      responseType: 'text',
    });
  }

  confirm(
    type: string,
    data: CodeConfirmInterface
  ): Observable<AuthResponseInterface> {
    return this.http
      .post<AuthResponseInterface>(
        environment.api + `api/account/${type}`,
        data
      )
      .pipe(
        tap((res) => {
          if (type !== 'confirm_check_phone') {
            this.setUserSettings(res);
          }
        })
      );
  }

  getNewCode(
    type: string,
    value: string | CheckCodeDataInterface,
    format?: string
  ): Observable<void> {
    let data: CheckCodeDataInterface;

    if (type === 'check_phone') {
      data = { ...(value as CheckCodeDataInterface) };
    }

    return this.http.post<void>(
      environment.api + `api/account/${type}`,
      data ? data : { [format]: value }
    );
  }

  checkPhone(data: CheckCodeDataInterface): Observable<void> {
    return this.http.post<void>(
      environment.api + 'api/account/check_phone',
      data
    );
  }

  login(data: LoginDataInterface): Observable<boolean> {
    return this.http.post<boolean>(environment.api + 'api/account/login', data);
  }

  setUserSettings(res: AuthResponseInterface): void {
    this.user$.next(res);
    localStorage.setItem('rzd-saved-user', JSON.stringify(res));
    this.setToken(res);
  }

  setToken(res: AuthResponseInterface | null): void {
    if (res) {
      const expDate = new Date(new Date().getTime() + 7200 * 1000);
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

  setUser(newUser: AuthResponseInterface): void {
    this.user$.next(newUser);
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
