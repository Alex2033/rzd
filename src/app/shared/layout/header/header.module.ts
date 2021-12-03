import { ClickOutsideModule } from './../../directives/click-outside/click-outside.module';
import { LocationBarComponent } from './components/location-bar/location-bar.component';
import { CitySelectComponent } from './components/city-select/city-select.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LocationComponent } from './components/location/location.component';
import { CitySearchComponent } from './components/city-search/city-search.component';
import { CityItemComponent } from './components/city-item/city-item.component';
import { CityConfirmComponent } from './components/city-confirm/city-confirm.component';
import { SearchModule } from '../../pipes/search/search.module';
import { TranslateModule } from '@ngx-translate/core';

const components = [
  HeaderComponent,
  LocationComponent,
  CityConfirmComponent,
  CitySelectComponent,
  CityItemComponent,
  CitySearchComponent,
  LocationBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SearchModule,
    ClickOutsideModule,
    TranslateModule,
  ],
  declarations: [components],
  exports: [components],
})
export class HeaderModule {}
