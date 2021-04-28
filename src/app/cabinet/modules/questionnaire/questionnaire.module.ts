import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { QuestionnairesService } from './services/questionnaires.service';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteComponent } from './components/delete/delete.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';

@NgModule({
  declarations: [QuestionnairesListComponent, DeleteComponent, WarningDialogComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [QuestionnairesService],
})
export class QuestionnaireModule {}
