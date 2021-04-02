import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnairesListComponent } from './pages/questionnaires-list/questionnaires-list.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionnairesListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionnaireRoutingModule {}
