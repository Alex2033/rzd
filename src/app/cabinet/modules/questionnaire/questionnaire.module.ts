import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';


@NgModule({
  declarations: [QuestionnairesListComponent],
  imports: [
    CommonModule,
    QuestionnaireRoutingModule
  ]
})
export class QuestionnaireModule { }
