import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'queue',
    loadChildren: () =>
      import('./modules/queue/queue.module').then((m) => m.QueueModule),
  },
  {
    path: 'questionnaires',
    loadChildren: () =>
      import('./modules/questionnaire/questionnaire.module').then(
        (m) => m.QuestionnaireModule
      ),
  },
  {
    path: 'services-registration',
    loadChildren: () =>
      import(
        './modules/services-registration/services-registration.module'
      ).then((m) => m.ServicesRegistrationModule),
  },
  {
    path: 'server-error/:key',
    loadChildren: () =>
      import('./modules/server-error/server-error.module').then(
        (m) => m.ServerErrorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
