import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { QuestionnairesService } from '../../../../../shared/services/questionnaires.service';
import { QuestionnaireContentInterface } from '../../types/questionnaire-content.interface';
import { QuestionnaireDetailInterface } from '../../types/questionnaire-detail.interface';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';

@Component({
  selector: 'app-choose-adult',
  templateUrl: './choose-adult.component.html',
  styleUrls: ['./choose-adult.component.scss'],
})
export class ChooseAdultComponent implements OnInit {
  public selectedAdult: QuestionnaireInterface;
  public adults$: Observable<QuestionnaireInterface[]>;

  constructor(
    private questionnairesService: QuestionnairesService,
    private router: Router,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.adults$ = this.questionnairesService.getQuestionnaires();
  }

  selectAdult(): void {
    const newChild: QuestionnaireDetailInterface = {
      id_parent: this.selectedAdult.id,
      content: {} as QuestionnaireContentInterface,
    };

    this.questionnairesService.create(newChild).subscribe((res) => {
      this.router.navigate(
        ['/cabinet', 'questionnaires', 'questionnaire', res],
        {
          queryParams: {
            step: 1,
          },
        }
      );
    });
  }
}
