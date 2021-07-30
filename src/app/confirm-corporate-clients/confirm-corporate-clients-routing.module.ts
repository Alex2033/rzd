import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmCorporateClientsComponent } from './pages/confirm-corporate-clients.component';

const routes: Routes = [
  { path: '', component: ConfirmCorporateClientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmCorporateClientsRoutingModule {}
