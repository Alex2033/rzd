import { OrderRefundSuccessComponent } from './pages/order-refund-success/order-refund-success.component';
import { OrderRefundComponent } from './pages/order-refund/order-refund.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { HowGetResultsComponent } from './pages/how-get-results/how-get-results.component';
import { BarcodeModalComponent } from './components/barcode-modal/barcode-modal.component';
import { SupportServiceComponent } from './pages/support-service/support-service.component';
import { SupportResponseComponent } from './pages/support-response/support-response.component';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrderDetailComponent,
    DocumentsComponent,
    HowGetResultsComponent,
    BarcodeModalComponent,
    SupportServiceComponent,
    SupportResponseComponent,
    OrderRefundComponent,
    OrderRefundSuccessComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxBarcode6Module,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class OrdersModule {}
