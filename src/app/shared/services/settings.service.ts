import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SettingsInterface } from '../types/settings.interface';
import { Observable, Subject } from 'rxjs';
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

  getSettings(): Observable<SettingsInterface> {
    return this.http
      .get<SettingsInterface>(environment.api + 'api/contents/settings')
      .pipe(shareReplay(1));
  }

  setUtmMark(val: string): void {
    this.utmMark = val;
    console.log('this.utmMark:', this.utmMark);
    if (this.utmMark) sessionStorage.setItem('rzd-utmMark', this.utmMark);
  }
}
