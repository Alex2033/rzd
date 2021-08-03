import { QuestionnaireInterface } from '../../../questionnaire/types/questionnaire.interface';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, combineLatest } from 'rxjs';
import { QuestionnairesService } from '../../../../../shared/services/questionnaires.service';

@Component({
  selector: 'app-empty-questionnaires',
  templateUrl: './empty-questionnaires.component.html',
  styleUrls: ['./empty-questionnaires.component.scss'],
})
export class EmptyQuestionnairesComponent implements OnInit, OnDestroy {
  public omsQuestionnaires: QuestionnaireInterface[] = [];
  public snilsQuestionnaires: QuestionnaireInterface[] = [];

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private questionnairesService: QuestionnairesService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.queryParams,
      this.questionnairesService.getQuestionnaires(),
    ])
      .pipe(takeUntil(this.destroy))
      .subscribe(([params, questionnaires]) => {
        const value: number[] = JSON.parse(params.value);
        Object.keys(value).forEach((key) => {
          const newQuestionnaires: QuestionnaireInterface[] = [];
          let questionnaire: QuestionnaireInterface;

          value[key].forEach((v) => {
            questionnaires.forEach((q) => {
              if (q.children) {
                questionnaire = q.children.find((q) => q.id === v);
              } else {
                questionnaire = questionnaires.find((q) => q.id === v);
              }
              newQuestionnaires.push(questionnaire);
            });
          });

          if (key === 'emptyOms') {
            this.omsQuestionnaires = [...new Set(newQuestionnaires)];
          }

          if (key === 'emptySnils') {
            this.snilsQuestionnaires = [...new Set(newQuestionnaires)];
          }
        });
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
