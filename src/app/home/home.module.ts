import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PluralRuModule } from '../shared/directives/plural-ru/plural-ru.module';
import { FormsModule } from '@angular/forms';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';

import { IndexComponent } from './pages/index/index.component';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServicePointsComponent } from './pages/service-points/service-points.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { ServicePointDetailComponent } from './pages/service-point-detail/service-point-detail.component';
import { ParagraphsPipe } from '../shared/pipes/paragraphs.pipe';

@NgModule({
  declarations: [
    IndexComponent,
    FooterComponent,
    ServicesComponent,
    ServicePointsComponent,
    ServiceDetailComponent,
    SearchPipe,
    ServicePointDetailComponent,
    ParagraphsPipe,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatExpansionModule,
    FormsModule,
    CarouselModule,
    PluralRuModule,
    AngularYandexMapsModule,
  ],
})
export class HomeModule {}
