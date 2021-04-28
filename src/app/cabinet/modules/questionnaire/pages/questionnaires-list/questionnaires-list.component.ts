import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteComponent } from '../../components/delete/delete.component';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { KidInterface } from '../../types/kid.interface';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.scss'],
})
export class QuestionnairesListComponent implements OnInit, OnDestroy {
  public questionnaires: QuestionnaireInterface[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private questionnairesService: QuestionnairesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questionnairesService
      .getQuestionnaires()
      .pipe(takeUntil(this.destroy$))
      .subscribe((questionnaires: QuestionnaireInterface[]) => {
        this.questionnaires = questionnaires;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByFn(_, item: QuestionnaireInterface): number {
    return item.id;
  }

  openDeleteDialog(
    questionnaire: QuestionnaireInterface,
    kid?: KidInterface
  ): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'custom-dialog',
      backdropClass: 'custom-dialog-overlay',
      width: '28rem',
      autoFocus: false,
    });

    if (questionnaire.kids.length) {
      return;
    }

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (kid) {
          this.deleteKid(questionnaire, kid);
        } else {
          this.deleteQuestionnaire(questionnaire);
        }
      }
    });
  }

  deleteKid(questionnaire: QuestionnaireInterface, kid: KidInterface) {
    const changedKids = questionnaire.kids.filter((k) => k.id !== kid.id);
    const changedQuestionnaire = { ...questionnaire, kids: changedKids };
    this.questionnairesService
      .deleteKid(changedQuestionnaire)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  deleteQuestionnaire(questionnaire: QuestionnaireInterface) {
    this.questionnairesService
      .delete(questionnaire.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
}
