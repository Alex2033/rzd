import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockingScreenComponent } from './blocking-screen/blocking-screen.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ReturnDateComponent } from './pages/return-date/return-date.component';
import { SelectPointComponent } from './pages/select-point/select-point.component';

const routes: Routes = [
  {
    path: 'questions/:id',
    component: QuestionsComponent,
  },
  {
    path: 'return-date',
    component: ReturnDateComponent,
  },
  {
    path: 'blocking-screen',
    component: BlockingScreenComponent,
  },
  {
    path: 'select-point',
    component: SelectPointComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRegistrationRoutingModule {}
