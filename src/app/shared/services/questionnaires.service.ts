import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CheckCorpResponseInterface } from 'src/app/shared/types/check-corp-response.interface';
import { environment } from 'src/environments/environment';
import { DoctypeInterface } from '../../cabinet/modules/questionnaire/types/doctype.interface';
import { QuestionnaireDetailInterface } from '../../cabinet/modules/questionnaire/types/questionnaire-detail.interface';
import { QuestionnaireInterface } from '../../cabinet/modules/questionnaire/types/questionnaire.interface';
import { UpdatedFieldInterface } from '../../cabinet/modules/questionnaire/types/updated-field.interface';

@Injectable({
  providedIn: 'root',
})
export class QuestionnairesService {
  constructor(private http: HttpClient, private translate: TranslateService) {}

  getQuestionnaires(): Observable<QuestionnaireInterface[]> {
    return this.http.get<QuestionnaireInterface[]>(
      environment.api + 'api/anketa'
    );
  }

  getQuestionnaire(id: number): Observable<QuestionnaireDetailInterface> {
    return this.http.get<QuestionnaireDetailInterface>(
      `${environment.api}api/anketa/${id}`
    );
  }

  create(data: QuestionnaireDetailInterface): Observable<void> {
    return this.http.post<void>(environment.api + 'api/anketa', data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.api}api/anketa/${id}`);
  }

  updateField(updatedField: UpdatedFieldInterface): Observable<void> {
    return this.http.put<void>(
      environment.api + 'api/anketa/autofield',
      updatedField
    );
  }

  getDocumentTypes(
    isChild: boolean,
    langId: string = this.translate.currentLang
  ): Observable<DoctypeInterface[]> {
    return this.http.get<DoctypeInterface[]>(
      environment.api + `api/contents/documents?child=${isChild}&lang=${langId}`
    );
  }

  checkCorp(id: number): Observable<CheckCorpResponseInterface> {
    return this.http.get<CheckCorpResponseInterface>(
      environment.api + `api/anketa/checkcorp?id=${id}`
    );
  }
}
