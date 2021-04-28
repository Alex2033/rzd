import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { QuestionnaireInterface } from '../types/questionnaire.interface';

@Injectable()
export class QuestionnairesService {
  constructor(private http: HttpClient) {}

  getQuestionnaires(): Observable<QuestionnaireInterface[]> {
    return this.http
      .get<QuestionnaireInterface[]>(environment.fakeApi + 'questionnaires')
      .pipe(share());
  }
}
