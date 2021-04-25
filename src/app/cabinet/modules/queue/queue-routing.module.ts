import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueueComponent } from './pages/queue/queue.component';

const routes: Routes = [
  {
    path: '',
    component: QueueComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueueRoutingModule {}
