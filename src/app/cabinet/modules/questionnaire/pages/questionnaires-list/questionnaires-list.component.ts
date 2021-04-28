import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.scss'],
})
export class QuestionnairesListComponent implements OnInit {
  public questionnaires$: Observable<QuestionnaireInterface[]>;

  constructor(private questionnairesService: QuestionnairesService) {}

  ngOnInit(): void {
    this.questionnaires$ = this.questionnairesService.getQuestionnaires();
  }

  trackByFn(_, item: QuestionnaireInterface): number {
    return item.id;
  }
}
