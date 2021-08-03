import { SettingsService } from './../../../../../shared/services/settings.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { finalize, switchMap, takeUntil, map } from 'rxjs/operators';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { QuestionnaireOrderInterface } from 'src/app/shared/types/questionnaire-order.interface';
import { CreateSheetComponent } from '../../components/create-sheet/create-sheet.component';
import { DeleteComponent } from '../../components/delete/delete.component';
import { WarningDialogComponent } from '../../components/warning-dialog/warning-dialog.component';
import { QuestionnairesService } from '../../../../../shared/services/questionnaires.service';
import { QuestionnaireDetailInterface } from '../../types/questionnaire-detail.interface';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';
import { QuestionnaireContentInterface } from '../../types/questionnaire-content.interface';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.scss'],
})
export class QuestionnairesListComponent implements OnInit, OnDestroy {
  public questionnaires: QuestionnaireInterface[] = [];
  public checkedQuestionnairesIds: QuestionnaireOrderInterface[] = [];
  public isLoading: boolean = false;
  public enableOrderCreation$: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    private questionnairesService: QuestionnairesService,
    private dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private servicesRegistration: ServicesRegistrationService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.getQuestionnaires();
  }

  initializeValues(): void {
    this.isLoading = true;
    this.enableOrderCreation$ = this.settings.getSettings().pipe(
      map((settings) => settings.enableOrderCreation),
      takeUntil(this.destroy$)
    );
  }

  getQuestionnaires(): void {
    this.questionnairesService
      .getQuestionnaires()
      .pipe(
        finalize(() => (this.isLoading = false)),
        takeUntil(this.destroy$)
      )
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

    bottomSheet
      .afterDismissed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res === 'child') {
          this.router.navigate(['/cabinet', 'questionnaires', 'info-message'], {
            queryParams: {
              isChild: true,
            },
          });
        } else if (res === 'adult') {
          this.router.navigate(['/cabinet', 'questionnaires', 'info-message']);
        }
      });
  }

  createAdultQuestionnaire(res): Observable<void> {
    if (res) {
      const newQuestionnaire: QuestionnaireDetailInterface = {
        id_parent: 0,
        content: {} as QuestionnaireContentInterface,
      };
      return this.questionnairesService.create(newQuestionnaire);
    }

    return of();
  }

  selectQuestionnaire(
    checkbox: MatCheckbox,
    questionnaire: QuestionnaireInterface
  ): void {
    if (questionnaire.draft) {
      this.router.navigate(
        ['/cabinet', 'questionnaires', 'questionnaire', questionnaire.id],
        {
          queryParams: {
            step: 1,
          },
        }
      );
      return;
    }

    checkbox.checked = !checkbox.checked;
    this.toggleCheck(checkbox.checked, questionnaire);
  }

  toggleCheck(checked: boolean, questionnaire: QuestionnaireInterface): void {
    if (checked) {
      this.checkedQuestionnairesIds.push({
        id_anketa: questionnaire.id,
        services: [],
        is_corp_client: questionnaire.is_corp_client,
        fio: `${questionnaire.surname ?? ''} ${questionnaire.name ?? ''} ${
          questionnaire.patronymic ?? ''
        }`,
      });
    } else {
      this.checkedQuestionnairesIds = this.checkedQuestionnairesIds.filter(
        (el) => el.id_anketa !== questionnaire.id
      );
    }
  }

  goToServicesRegistration(): void {
    const questionnaires: { items: QuestionnaireOrderInterface[] } = {
      items: [...this.checkedQuestionnairesIds],
    };
    this.servicesRegistration.order = {} as OrderInterface;
    this.servicesRegistration.setOrder({ id: 0, ...questionnaires });
    this.router.navigate(['/cabinet', 'services-registration', 'info']);
  }
}
