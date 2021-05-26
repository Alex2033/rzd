import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './pages/documents/documents.component';
import { HowGetResultsComponent } from './pages/how-get-results/how-get-results.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
  },
  {
    path: 'results',
    component: HowGetResultsComponent,
  },
  {
    path: ':id',
    component: OrderDetailComponent,
  },
  {
    path: ':id/documents',
    component: DocumentsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
