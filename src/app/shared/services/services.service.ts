import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServiceInterface } from '../types/service.interface';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(
    private http: HttpClient,
    private location: LocationService,
    private translate: TranslateService
  ) {}

  getServices(
    point?: number,
    langId: string = this.translate.currentLang,
    city: number = this.location.getLocationValue().id
  ): Observable<ServiceInterface[]> {
    return this.http.get<ServiceInterface[]>(
      environment.api +
        `api/contents/services?city=${city}&lang=${langId}${
          point ? '&point=' + point : ''
        }`
    );
  }

  getService(id: number): Observable<ServiceInterface> {
    return this.getServices().pipe(
      map((services) => services.find((service) => service.id === id))
    );
  }
}
