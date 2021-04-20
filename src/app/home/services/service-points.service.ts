import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServicePointInterface } from '../types/service-point.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicePointsService {
  constructor(private http: HttpClient) {}

  getServicePoints(
    langId: number = 1,
    serviceId?: number
  ): Observable<ServicePointInterface[]> {
    return this.http.get<ServicePointInterface[]>(
      environment.api +
        `api/contents/points?lang=${langId}${
          serviceId ? '&service=' + serviceId : ''
        }`
    );
  }

  getServicePoint(
    id: number,
    langId: number = 1
  ): Observable<ServicePointInterface> {
    return this.getServicePoints(langId).pipe(
      map((services) => services.find((service) => service.id === id))
    );
  }
}
