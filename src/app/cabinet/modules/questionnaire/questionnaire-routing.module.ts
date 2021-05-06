import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionnaireComponent } from './pages/create-questionnaire/create-questionnaire.component';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnairesListComponent,
  },
  {
    path: 'create',
    component: CreateQuestionnaireComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireRoutingModule {}
