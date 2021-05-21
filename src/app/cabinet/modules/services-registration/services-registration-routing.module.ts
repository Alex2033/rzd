import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './pages/questions/questions.component';

const routes: Routes = [
  {
    path: 'questions/:id',
    component: QuestionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRegistrationRoutingModule {}
