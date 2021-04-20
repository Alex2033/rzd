import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServiceInterface } from '../types/service.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  getServices(langId: number, point?: number): Observable<ServiceInterface[]> {
    return this.http.get<ServiceInterface[]>(
      environment.api +
        `api/contents/services?lang=${langId}${
          point ? '&service=' + point : ''
        }`
    );
  }

  getService(id: number, langId: number = 1): Observable<ServiceInterface> {
    return this.getServices(langId).pipe(
      map((services) => services.find((service) => service.id === id))
    );
  }
}
