import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './pages/questions/questions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'questions',
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRegistrationRoutingModule {}
