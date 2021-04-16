import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServicePointsComponent } from './pages/service-points/service-points.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    IndexComponent,
    FooterComponent,
    ServicesComponent,
    ServicePointsComponent,
    ServiceDetailComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, MatExpansionModule, MatTabsModule],
})
export class HomeModule {}
