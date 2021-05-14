import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { ServicePointsComponent } from './pages/service-points/service-points.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ServicePointDetailComponent } from './pages/service-point-detail/service-point-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ParagraphsPipe } from '../shared/pipes/paragraphs.pipe';
import { PluralRuModule } from '../shared/directives/plural-ru/plural-ru.module';

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
  ],
})
export class HomeModule {}
