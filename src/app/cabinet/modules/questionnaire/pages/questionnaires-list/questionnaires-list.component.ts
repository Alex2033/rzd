import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeleteComponent } from '../../components/delete/delete.component';
import { QuestionnairesService } from '../../services/questionnaires.service';
import { KidInterface } from '../../types/kid.interface';
import { QuestionnaireInterface } from '../../types/questionnaire.interface';

@Component({
  selector: 'app-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.scss'],
})
export class QuestionnairesListComponent implements OnInit {
  public questionnaires$: Observable<QuestionnaireInterface[]>;

  constructor(
    private questionnairesService: QuestionnairesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.questionnaires$ = this.questionnairesService.getQuestionnaires();
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

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (kid) {
          const changedKids = questionnaire.kids.filter((k) => k.id !== kid.id);
          const changedQuestionnaire = { ...questionnaire, kids: changedKids };
          this.questionnairesService
            .deleteKid(changedQuestionnaire)
            .subscribe();
        } else {
          this.questionnairesService.delete(questionnaire.id).subscribe();
        }
      }
    });
  }
}
