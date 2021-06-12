import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionnaireDeactivateGuard } from './guards/create-questionnaire-deactivate.guard';
import { CreateQuestionnaireComponent } from './pages/create-questionnaire/create-questionnaire.component';
import { ChooseAdultComponent } from './pages/choose-adult/choose-adult.component';
import { InfoMessageComponent } from './pages/info-message/info-message.component';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnairesListComponent,
  },
  {
    path: 'choose-adult',
    component: ChooseAdultComponent,
  },
  {
    path: 'questionnaire/:id',
    component: CreateQuestionnaireComponent,
    canDeactivate: [CreateQuestionnaireDeactivateGuard],
  },
  {
    path: 'info-message',
    component: InfoMessageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireRoutingModule {}
