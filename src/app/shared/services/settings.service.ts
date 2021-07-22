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
  constructor(private http: HttpClient) {}

  getSettings(): Observable<SettingsInterface> {
    return this.http
      .get<SettingsInterface>(environment.api + 'api/contents/settings')
      .pipe(shareReplay(1));
  }
}
