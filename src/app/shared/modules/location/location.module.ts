import { CityItemComponent } from './components/city-item/city-item.component';
import { CitySelectComponent } from './components/city-select/city-select.component';
import { CityConfirmComponent } from './components/city-confirm/city-confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationComponent } from './location.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LocationComponent,
    CityConfirmComponent,
    CitySelectComponent,
    CityItemComponent,
  ],
})
export class LocationModule {}
