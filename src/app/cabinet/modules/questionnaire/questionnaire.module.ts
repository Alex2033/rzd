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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuestionnairesListComponent,
    DeleteComponent,
    WarningDialogComponent,
    CreateSheetComponent,
  ],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatBottomSheetModule,
    FormsModule,
  ],
  providers: [QuestionnairesService],
})
export class QuestionnaireModule {}
