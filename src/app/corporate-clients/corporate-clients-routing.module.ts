import { InfoCorporateClientsComponent } from './pages/info-corporate-clients/info-corporate-clients.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmCorporateClientsComponent } from './pages/confirm-corporate-clients/confirm-corporate-clients.component';

const routes: Routes = [
  { path: '', component: ConfirmCorporateClientsComponent },
  { path: 'info', component: InfoCorporateClientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporateClientsRoutingModule {}
