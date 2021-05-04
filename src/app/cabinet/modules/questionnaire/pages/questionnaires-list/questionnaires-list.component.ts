import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateSheetComponent } from '../../components/create-sheet/create-sheet.component';
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
  public checkedQuestionnaires: QuestionnaireInterface[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private questionnairesService: QuestionnairesService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
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

  detectChecked(): void {
    this.checkedQuestionnaires = this.questionnaires.filter(
      (q: QuestionnaireInterface) => {
        if (q.kids && q.kids.filter((kid) => kid.checked).length) {
          return true;
        }
        return q.checked;
      }
    );
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

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        kid
          ? this.deleteKid(questionnaire, kid)
          : this.deleteQuestionnaire(questionnaire);
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

  openBottomSheet(): void {
    const bottomSheet = this._bottomSheet.open(CreateSheetComponent, {
      panelClass: 'custom-bottom-sheet',
      data: {
        questionnaires: this.questionnaires,
      },
    });
    bottomSheet.afterDismissed().subscribe((res) => console.log(res));
  }
}
