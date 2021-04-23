import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';


@NgModule({
  declarations: [OrdersListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
