import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';
import { QuestionnairesService } from './services/questionnaires.service';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [QuestionnairesListComponent],
  imports: [CommonModule, QuestionnaireRoutingModule, MatCheckboxModule],
  providers: [QuestionnairesService],
})
export class QuestionnaireModule {}
