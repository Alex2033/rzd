import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { CreateSheetComponent } from '../../components/create-sheet/create-sheet.component';
import { DeleteComponent } from '../../components/delete/delete.component';
import { WarningDialogComponent } from '../../components/warning-dialog/warning-dialog.component';
import { QuestionnairesService } from '../../services/questionnaires.service';
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
    // this.checkedQuestionnaires = this.questionnaires.filter(
    //   (q: QuestionnaireInterface) => {
    //     if (q.children && q.children.filter((kid) => kid.checked).length) {
    //       return true;
    //     }
    //     return q.checked;
    //   }
    // );
  }

  openDeleteDialog(questionnaire: QuestionnaireInterface): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'custom-dialog',
      backdropClass: 'custom-dialog-overlay',
      width: '28rem',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteQuestionnaire(questionnaire);
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

  deleteQuestionnaire(questionnaire: QuestionnaireInterface) {
    this.questionnairesService
      .delete(questionnaire.id)
      .pipe(
        switchMap(() => this.questionnairesService.getQuestionnaires()),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.questionnaires = res;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.deleteErrorHandle(err);
          }
        }
      );
  }

  deleteErrorHandle(err: HttpErrorResponse): void {
    const { error } = err.error;
    if (error === 'IS_PARENT') {
      this.openWarningDialog();
    }
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
