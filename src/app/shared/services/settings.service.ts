import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsInterface } from '../types/settings.interface';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public utmMark: string;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('rzd-utmMark'))
      this.utmMark = sessionStorage.getItem('rzd-utmMark');
  }

  getSettings(id_point?: number): Observable<SettingsInterface> {
    return this.http
      .get<SettingsInterface>(
        `${environment.api}api/contents/settings${
          id_point ? '?id_point=' + id_point : ''
        }`
      )
      .pipe(shareReplay(1));
  }

  setUtmMark(val: string): void {
    this.utmMark = val;
    if (this.utmMark) sessionStorage.setItem('rzd-utmMark', this.utmMark);
  }
}
