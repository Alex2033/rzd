import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ServicesRegistrationRoutingModule } from './services-registration-routing.module';
import { QuestionsComponent } from './pages/questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ReturnDateComponent } from './pages/return-date/return-date.component';
import { ErrorMessagesModule } from 'src/app/shared/modules/error-messages/error-messages.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BlockingScreenComponent } from './blocking-screen/blocking-screen.component';
import { SelectPointComponent } from './pages/select-point/select-point.component';
import { SelectServicesComponent } from './pages/select-services/select-services.component';
import { DocumentComponent } from './pages/document/document.component';
import { PluralRuModule } from 'src/app/shared/directives/plural-ru/plural-ru.module';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { SignatureComponent } from './pages/signature/signature.component';

@NgModule({
  declarations: [
    QuestionsComponent,
    ReturnDateComponent,
    BlockingScreenComponent,
    SelectPointComponent,
    SelectServicesComponent,
    DocumentComponent,
    ConfirmOrderComponent,
    SignatureComponent,
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
    FormsModule,
    PluralRuModule,
  ],
  providers: [DatePipe],
})
export class ServicesRegistrationModule {}
