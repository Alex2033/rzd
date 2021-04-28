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
      environment.fakeApi + 'questionnaires'
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(environment.fakeApi + 'questionnaires/' + id);
  }

  deleteKid(changedQuestionnaire: QuestionnaireInterface): Observable<void> {
    return this.http.patch<void>(
      environment.fakeApi + 'questionnaires/' + changedQuestionnaire.id,
      changedQuestionnaire
    );
  }
}
