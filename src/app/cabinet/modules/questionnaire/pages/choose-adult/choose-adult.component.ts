import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';

@Component({
  selector: 'app-choose-adult',
  templateUrl: './choose-adult.component.html',
  styleUrls: ['./choose-adult.component.scss'],
})
export class ChooseAdultComponent implements OnInit {
  public selectedAdult: string;
  public adults$: Observable<QuestionnaireInterface[]>;

  constructor(private questionnairesService: QuestionnairesService) {}

  ngOnInit(): void {
    this.adults$ = this.questionnairesService.getQuestionnaires();
  }
}
