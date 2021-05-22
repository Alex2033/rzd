import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicePointsService {
  public langId: number;

  constructor(private http: HttpClient) {}

  getServicePoints(
    serviceId?: number,
    langId: number = this.langId
  ): Observable<ServicePointInterface[]> {
    return this.http.get<ServicePointInterface[]>(
      environment.api +
        `api/contents/points?lang=${langId}${
          serviceId ? '&service=' + serviceId : ''
        }`
    );
  }

  getServicePoint(id: number): Observable<ServicePointInterface> {
    return this.getServicePoints().pipe(
      map((services) => services.find((service) => service.id === id))
    );
  }
}
