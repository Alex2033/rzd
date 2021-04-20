import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicePointInterface } from '../types/service-point.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicePointsService {
  constructor(private http: HttpClient) {}

  getServicePoints(langId: number): Observable<ServicePointInterface[]> {
    return this.http.get<ServicePointInterface[]>(
      environment.api + `api/contents/points?lang=${langId}`
    );
  }
}
