import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceInterface } from '../types/service.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  getServices(langId: number): Observable<ServiceInterface[]> {
    return this.http.get<ServiceInterface[]>(
      environment.api + `api/contents/services?lang=${langId}`
    );
  }

  getService(id: number, langId: number): Observable<ServiceInterface> {
    return this.http.get<ServiceInterface>(
      environment.api + `api/contents/services?lang=${langId}&point=${id}`
    );
  }
}
