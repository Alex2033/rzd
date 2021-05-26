import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HowGetResultsComponent } from './pages/how-get-results/how-get-results.component';

@NgModule({
  declarations: [OrdersListComponent, OrderDetailComponent, DocumentsComponent, HowGetResultsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class OrdersModule {}
