import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { QuestionnairesService } from './services/questionnaires.service';
import { DeleteComponent } from './components/delete/delete.component';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
import { CreateSheetComponent } from './components/create-sheet/create-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionnaireComponent } from './pages/create-questionnaire/create-questionnaire.component';

@NgModule({
  declarations: [
    QuestionnairesListComponent,
    DeleteComponent,
    WarningDialogComponent,
    CreateSheetComponent,
    CreateQuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [QuestionnairesService],
})
export class QuestionnaireModule {}
