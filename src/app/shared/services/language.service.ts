import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DictionaryRecord } from '../types/dictionary-record.interface';
import { LanguageInterface } from '../types/language.interface';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public activeLanguage: BehaviorSubject<LanguageInterface> = new BehaviorSubject<LanguageInterface>(
    {} as LanguageInterface
  );
  private langId: number = 1;

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<LanguageInterface[]> {
    return this.http
      .get<LanguageInterface[]>(environment.api + 'languages')
      .pipe(
        tap((languages) => {
          this.activeLanguage.next(languages[0]);
        })
      );
  }

  get(langId: number): Observable<DictionaryRecord[]> {
    const urlParams =
      langId === undefined ? '' : '?langId=' + langId.toString();
    return this.http.get<DictionaryRecord[]>(
      environment.api + 'dictionary' + urlParams
    );
  }
}
