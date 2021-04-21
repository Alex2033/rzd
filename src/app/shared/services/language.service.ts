import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { DictionaryRecord } from '../types/dictionary-record.interface';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public langId: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  private resources: [DictionaryRecord[]?] = [];

  constructor(private http: HttpClient) {}

  get(key: string) {
    for (let resource of this.resources) {
      let element = resource.find((x) => {
        return x.key === key;
      });
      if (element) {
        return element.value;
      }
    }
    return key;
  }

  init(langId: number): void {
    const newLangId = +localStorage.getItem('newLangId');

    if (!langId && newLangId) {
      langId = newLangId;
    }

    if (!langId) {
      langId = 1;
    }

    this.setLangId(langId);
    this.loadFromLocal(langId)
      .pipe(first())
      .subscribe((res: any) => {
        this.resources = res;
      });
  }

  setLangId(langId: number = 1): void {
    this.langId.next(langId);
    localStorage.setItem('newLangId', JSON.stringify(langId));
  }

  getLangId(): Observable<number> {
    return this.langId.asObservable();
  }

  loadFromLocal(langId: number): Observable<DictionaryRecord[]> {
    return this.http.get<DictionaryRecord[]>(
      `assets/dictionaries/${langId}.json`
    );
  }
}
