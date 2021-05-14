import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRadioModule } from '@angular/material/radio';

import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { QuestionnairesService } from './services/questionnaires.service';
import { DeleteComponent } from './components/delete/delete.component';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
import { CreateSheetComponent } from './components/create-sheet/create-sheet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionnaireComponent } from './pages/create-questionnaire/create-questionnaire.component';
import { ChooseAdultComponent } from './pages/choose-adult/choose-adult.component';
import { PluralRuModule } from 'src/app/shared/directives/plural-ru/plural-ru.module';

@NgModule({
  declarations: [
    QuestionnairesListComponent,
    DeleteComponent,
    WarningDialogComponent,
    CreateSheetComponent,
    CreateQuestionnaireComponent,
    ChooseAdultComponent,
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
    MatRadioModule,
    PluralRuModule,
  ],
  providers: [QuestionnairesService],
})
export class QuestionnaireModule {}
