import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QrNavigationComponent } from './qr-navigation.component';

const routes: Routes = [
  {
    path: ':id',
    component: QrNavigationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrNavigationRoutingModule {}
