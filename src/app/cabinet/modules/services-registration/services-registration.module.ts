import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ServicesRegistrationRoutingModule } from './services-registration-routing.module';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ReturnDateComponent } from './pages/return-date/return-date.component';
import { ErrorMessagesModule } from 'src/app/shared/modules/error-messages/error-messages.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BlockingScreenComponent } from './blocking-screen/blocking-screen.component';
import { SelectPointComponent } from './pages/select-point/select-point.component';

@NgModule({
  declarations: [
    QuestionsComponent,
    ReturnDateComponent,
    BlockingScreenComponent,
    SelectPointComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServicesRegistrationRoutingModule,
    MatRadioModule,
    ErrorMessagesModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [DatePipe],
})
export class ServicesRegistrationModule {}
