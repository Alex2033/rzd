import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { DocumentsComponent } from './pages/documents/documents.component';

@NgModule({
  declarations: [OrdersListComponent, OrderDetailComponent, DocumentsComponent],
  imports: [CommonModule, OrdersRoutingModule],
})
export class OrdersModule {}
