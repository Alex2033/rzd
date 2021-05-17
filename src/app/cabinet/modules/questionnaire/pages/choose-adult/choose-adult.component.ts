import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionnairesService } from '../../services/questionnaires.service';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adults$ = this.questionnairesService.getQuestionnaires();
  }

  selectAdult(): void {
    const newChild: QuestionnaireDetailInterface = {
      id_parent: this.selectedAdult.id,
      content: {},
    };

    this.questionnairesService.create(newChild).subscribe(
      (res) => {
        console.log('res:', res);
      },
      (err) => {
        console.log('err:', err);
      }
    );
  }
}
