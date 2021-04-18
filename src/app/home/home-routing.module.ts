import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
