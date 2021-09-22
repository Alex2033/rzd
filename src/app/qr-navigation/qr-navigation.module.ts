import { SafeUrlPipe } from './safe-url.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrNavigationComponent } from './qr-navigation.component';

import { QrNavigationRoutingModule } from './qr-navigation-routing.module';

@NgModule({
  imports: [CommonModule, QrNavigationRoutingModule],
  declarations: [QrNavigationComponent, SafeUrlPipe],
  providers: [],
})
export class QrNavigationModule {}
