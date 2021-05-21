import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRegistrationRoutingModule } from './services-registration-routing.module';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServicesRegistrationRoutingModule,
  ],
})
export class ServicesRegistrationModule {}
