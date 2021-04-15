import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
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
    path: 'service-points',
    component: ServicePointsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
