import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/home/home.component';
import { LegalInformationComponent } from './pages/legal-information/legal-information.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { ServicePointDetailComponent } from './pages/service-point-detail/service-point-detail.component';
import { ServicePointsComponent } from './pages/service-points/service-points.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'services/:id',
    component: ServiceDetailComponent,
  },
  {
    path: 'service-points',
    component: ServicePointsComponent,
  },
  {
    path: 'service-points/:id',
    component: ServicePointDetailComponent,
  },
  {
    path: 'legal-information',
    component: LegalInformationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
