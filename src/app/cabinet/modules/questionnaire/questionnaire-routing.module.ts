import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionnaireDeactivateGuard } from './guards/create-questionnaire-deactivate.guard';
import { AdultCreateComponent } from './pages/adult-create/adult-create.component';
import { ChooseAdultComponent } from './pages/choose-adult/choose-adult.component';
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
    component: AdultCreateComponent,
    canDeactivate: [CreateQuestionnaireDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireRoutingModule {}
