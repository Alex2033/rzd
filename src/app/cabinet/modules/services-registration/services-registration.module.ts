import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRegistrationRoutingModule } from './services-registration-routing.module';
import { QuestionsComponent } from './pages/questions/questions.component';


@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    ServicesRegistrationRoutingModule
  ]
})
export class ServicesRegistrationModule { }
