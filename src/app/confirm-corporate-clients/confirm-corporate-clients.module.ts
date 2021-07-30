import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ConfirmCorporateClientsRoutingModule } from './confirm-corporate-clients-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessagesModule } from '../shared/modules/error-messages/error-messages.module';
import { ConfirmCorporateClientsComponent } from './pages/confirm-corporate-clients.component';

@NgModule({
  declarations: [ConfirmCorporateClientsComponent],
  imports: [
    CommonModule,
    ConfirmCorporateClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorMessagesModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
})
export class ConfirmCorporateClientsModule {}
