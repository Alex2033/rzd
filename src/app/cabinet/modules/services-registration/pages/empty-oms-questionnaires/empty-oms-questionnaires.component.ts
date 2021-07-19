import { QuestionnaireInterface } from './../../../questionnaire/types/questionnaire.interface';
import { takeUntil, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Observable, combineLatest } from 'rxjs';
import { QuestionnairesService } from '../../../questionnaire/services/questionnaires.service';

@Component({
  selector: 'app-empty-oms-questionnaires',
  templateUrl: './empty-oms-questionnaires.component.html',
  styleUrls: ['./empty-oms-questionnaires.component.scss'],
})
export class EmptyOmsQuestionnairesComponent implements OnInit, OnDestroy {
  public questionnaires: QuestionnaireInterface[] = [];

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
        const newQuestionnaires: QuestionnaireInterface[] = [];
        let questionnaire: QuestionnaireInterface;

        value.forEach((v) => {
          questionnaires.forEach((q) => {
            if (q.children) {
              questionnaire = q.children.find((q) => q.id === v);
            } else {
              questionnaire = questionnaires.find((q) => q.id === v);
            }
            newQuestionnaires.push(questionnaire);
          });
        });
        this.questionnaires = [...new Set(newQuestionnaires)];
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
