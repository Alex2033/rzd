import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './pages/documents/documents.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
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
