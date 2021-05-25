import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { QuestionnaireDetailInterface } from '../../types/questionnaire-detail.interface';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent implements OnInit, OnDestroy {
  private isChild: boolean = false;
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private router: Router,
    private questionnairesService: QuestionnairesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy)).subscribe((params) => {
      this.isChild = params.isChild === 'true';
    });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  goToCreation(): void {
    if (this.isChild) {
      this.router.navigate(['/cabinet', 'questionnaires', 'choose-adult']);
    } else {
      this.createAdultQuestionnaire();
    }
  }

  createAdultQuestionnaire(): void {
    const newQuestionnaire: QuestionnaireDetailInterface = {
      id_parent: 0,
      content: {},
    };
    this.questionnairesService
      .create(newQuestionnaire)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
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
