import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDataInterface } from '../types/auth.interface';
import { SmsConfirmInterface } from '../types/sms-confirm.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: AuthDataInterface): Observable<{}> {
    return this.http.post<{}>(environment.api + 'api/account/register', data);
  }

  confirmInvite(data: SmsConfirmInterface): Observable<{}> {
    return this.http.post<{}>(
      environment.api + 'api/account/confirm_invite',
      data
    );
  }

  reInvite(phone: string): Observable<{}> {
    return this.http.post<{}>(environment.api + 'api/account/reinvite', {
      phone,
    });
  }
}
