import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmsConfirmInterface } from 'src/app/auth/types/sms-confirm.interface';
import { CheckPhoneDataInterface } from 'src/app/shared/types/phone-data.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  checkPhone(data: CheckPhoneDataInterface): Observable<void> {
    return this.http.post<void>(
      environment.api + 'api/account/check_phone',
      data
    );
  }

  confirmPhone(data: SmsConfirmInterface): Observable<void> {
    return this.http.post<void>(
      environment.api + 'api/account/confirm_check_phone',
      data
    );
  }
}
