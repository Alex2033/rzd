import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PluralRuModule } from 'src/app/shared/directives/plural-ru/plural-ru.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessagesModule } from 'src/app/shared/modules/error-messages/error-messages.module';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';

import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { QuestionnairesService } from './services/questionnaires.service';
import { DeleteComponent } from './components/delete/delete.component';
import { WarningDialogComponent } from './components/warning-dialog/warning-dialog.component';
import { CreateSheetComponent } from './components/create-sheet/create-sheet.component';
import { CreateQuestionnaireComponent } from './pages/create-questionnaire/create-questionnaire.component';
import { ChooseAdultComponent } from './pages/choose-adult/choose-adult.component';
import { AdultCreateComponent } from './pages/adult-create/adult-create.component';
import { CyrillicToLatinPipe } from 'src/app/shared/pipes/cyrilic-to-latin.pipe';
import { BasicDataComponent } from './components/basic-data/basic-data.component';
import { DocumentStepComponent } from './components/document-step/document-step.component';

@NgModule({
  declarations: [
    QuestionnairesListComponent,
    DeleteComponent,
    WarningDialogComponent,
    CreateSheetComponent,
    CreateQuestionnaireComponent,
    ChooseAdultComponent,
    AdultCreateComponent,
    BasicDataComponent,
    DocumentStepComponent,
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
    MatFormFieldModule,
    MatInputModule,
    ErrorMessagesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
  ],
  providers: [QuestionnairesService, CyrillicToLatinPipe],
})
export class QuestionnaireModule {}
