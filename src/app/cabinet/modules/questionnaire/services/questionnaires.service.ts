import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { KidInterface } from '../types/kid.interface';
import { QuestionnaireInterface } from '../types/questionnaire.interface';

@Injectable()
export class QuestionnairesService {
  constructor(private http: HttpClient) {}

  getQuestionnaires(): Observable<QuestionnaireInterface[]> {
    return this.http
      .get<QuestionnaireInterface[]>(environment.fakeApi + 'questionnaires')
      .pipe(share());
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
