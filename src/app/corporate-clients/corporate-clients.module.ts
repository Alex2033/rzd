import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorMessagesModule } from '../shared/modules/error-messages/error-messages.module';
import { CorporateClientsRoutingModule } from './corporate-clients-routing.module';
import { ConfirmCorporateClientsComponent } from './pages/confirm-corporate-clients/confirm-corporate-clients.component';
import { InfoCorporateClientsComponent } from './pages/info-corporate-clients/info-corporate-clients.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ConfirmCorporateClientsComponent,
    InfoCorporateClientsComponent,
  ],
  imports: [
    CommonModule,
    CorporateClientsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorMessagesModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
  ],
  providers: [DatePipe],
})
export class CorporateClientsModule {}
