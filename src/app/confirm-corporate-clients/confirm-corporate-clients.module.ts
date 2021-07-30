import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmCorporateClientsRoutingModule } from './confirm-corporate-clients-routing.module';
import { ConfirmCorporateClientsComponent } from './confirm-corporate-clients.component';


@NgModule({
  declarations: [ConfirmCorporateClientsComponent],
  imports: [
    CommonModule,
    ConfirmCorporateClientsRoutingModule
  ]
})
export class ConfirmCorporateClientsModule { }
