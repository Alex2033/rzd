import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ServiceInterface } from '../types/service.interface';
import { LanguageService } from './language.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(
    private http: HttpClient,
    private location: LocationService,
    private language: LanguageService
  ) {}

  getServices(
    point?: number,
    langId: number = this.language.langId.getValue(),
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
