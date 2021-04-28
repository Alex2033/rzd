import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteComponent } from '../../components/delete/delete.component';
import { WarningDialogComponent } from '../../components/warning-dialog/warning-dialog.component';
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
    if (questionnaire.kids && !kid && questionnaire.kids.length) {
      this.openWarningDialog();
      return;
    }

    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'custom-dialog',
      backdropClass: 'custom-dialog-overlay',
      width: '28rem',
      autoFocus: false,
    });

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

  openWarningDialog(): void {
    this.dialog.open(WarningDialogComponent, {
      panelClass: 'custom-dialog',
      backdropClass: 'custom-dialog-overlay',
      width: '28rem',
      autoFocus: false,
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
