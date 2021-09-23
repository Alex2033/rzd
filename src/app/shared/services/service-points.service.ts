import { LocationService } from 'src/app/shared/services/location.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ServicePointsService {
  constructor(
    private http: HttpClient,
    private location: LocationService,
    private translate: TranslateService
  ) {}

  getServicePoints(
    serviceId?: number,
    langId: string = this.translate.currentLang,
    city: number = this.location.getLocationValue().id
  ): Observable<ServicePointInterface[]> {
    return this.http.get<ServicePointInterface[]>(
      environment.api +
        `api/contents/points?city=${city}&lang=${langId}${
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
