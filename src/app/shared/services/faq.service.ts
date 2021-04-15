import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FaqInterface } from '../types/faq.interface';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient) {}

  getFaq(): Observable<FaqInterface[]> {
    return this.http.get<FaqInterface[]>(environment.api + 'faq');
  }
}
