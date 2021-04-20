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

  constructor(private http: HttpClient) {
    this.init();
  }

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

  init(langId: number = 1) {
    this.loadFromLocal(langId)
      .pipe(first())
      .subscribe((res: any) => {
        this.resources = res;
      });
  }

  setLangId(langId: number = 1): Observable<void> {
    this.langId.next(langId);
    return of(void 0);
  }

  loadFromLocal(langId: number): Observable<DictionaryRecord[]> {
    return this.http.get<DictionaryRecord[]>(
      `assets/dictionaries/${langId}.json`
    );
  }
}
