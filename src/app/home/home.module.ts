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
import { ServicePointDetailComponent } from './pages/service-point-detail/service-point-detail.component';
import { ParagraphsPipe } from '../shared/pipes/paragraphs.pipe';
import { SearchModule } from '../shared/pipes/search/search.module';
import { LegalInformationComponent } from './pages/legal-information/legal-information.component';

@NgModule({
  declarations: [
    IndexComponent,
    FooterComponent,
    ServicesComponent,
    ServicePointsComponent,
    ServiceDetailComponent,
    ServicePointDetailComponent,
    ParagraphsPipe,
    LegalInformationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatExpansionModule,
    FormsModule,
    CarouselModule,
    PluralRuModule,
    AngularYandexMapsModule,
    SearchModule,
  ],
})
export class HomeModule {}
