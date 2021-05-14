import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionnaireInterface } from '../types/questionnaire.interface';

@Injectable()
export class QuestionnairesService {
  constructor(private http: HttpClient) {}

  getQuestionnaires(): Observable<QuestionnaireInterface[]> {
    return this.http.get<QuestionnaireInterface[]>(
      environment.api + 'api/anketa'
    );
  }

  getQuestionnaire(id: number): Observable<QuestionnaireInterface> {
    return this.http.get<QuestionnaireInterface>(
      `${environment.api}api/anketa/${id}`
    );
  }

  create(): Observable<void> {
    return this.http.delete<void>(environment.api + '');
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}api/anketa/${id}`);
  }

  update(data): Observable<void> {
    return this.http.put<void>(`${environment.api}api/anketa/${data.id}`, data);
  }
}
