import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorporateClientInterface } from '../types/corporate-client.interface';
import { B2BClientInterface } from '../types/b2b-client.interface';

@Injectable({
  providedIn: 'root',
})
export class CorporateClientsService {
  constructor(private http: HttpClient) {}

  getClient(code: string): Observable<CorporateClientInterface> {
    return this.http.get<CorporateClientInterface>(
      environment.api + `api/account/b2bclient?code=${code}`
    );
  }

  confirmClient(data: B2BClientInterface): Observable<void> {
    return this.http.post<void>(
      environment.api + 'api/account/b2bclient',
      data
    );
  }

  corpCheck(id: number): Observable<boolean> {
    return this.http.get<boolean>(
      environment.api + `api/order/corp_check?id_order=${id}`
    );
  }
}
