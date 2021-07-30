import { ConfirmCorporateClientsComponent } from './confirm-corporate-clients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ConfirmCorporateClientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmCorporateClientsRoutingModule {}
