import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FooterComponent } from '../shared/layout/footer/footer.component';

@NgModule({
  declarations: [IndexComponent, FooterComponent],
  imports: [CommonModule, HomeRoutingModule, MatExpansionModule],
})
export class HomeModule {}
