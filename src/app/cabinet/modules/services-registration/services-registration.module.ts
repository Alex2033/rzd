import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ServicesRegistrationRoutingModule } from './services-registration-routing.module';
import { QuestionsComponent } from './pages/questions/questions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ErrorMessagesModule } from 'src/app/shared/modules/error-messages/error-messages.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlockingScreenComponent } from './pages/blocking-screen/blocking-screen.component';
import { SelectPointComponent } from './pages/select-point/select-point.component';
import { SelectServicesComponent } from './pages/select-services/select-services.component';
import { DocumentComponent } from './pages/document/document.component';
import { PluralRuModule } from 'src/app/shared/directives/plural-ru/plural-ru.module';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { SignatureComponent } from './pages/signature/signature.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentResponseComponent } from './pages/payment-response/payment-response.component';
import { ServicesRegistrationInfoComponent } from './pages/services-registration-info/services-registration-info.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmRemoveSelectionsComponent } from './components/confirm-remove-selections/confirm-remove-selections.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { QrCodeInfoComponent } from './pages/qr-code-info/qr-code-info.component';
import { EmptyQuestionnairesComponent } from './pages/empty-questionnaires/empty-questionnaires.component';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { MaskModule } from 'src/app/shared/directives/mask/mask.module';
import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';

@NgModule({
  declarations: [
    QuestionsComponent,
    BlockingScreenComponent,
    SelectPointComponent,
    SelectServicesComponent,
    DocumentComponent,
    ConfirmOrderComponent,
    SignatureComponent,
    PaymentMethodComponent,
    PaymentResponseComponent,
    ServicesRegistrationInfoComponent,
    ConfirmRemoveSelectionsComponent,
    EmptyQuestionnairesComponent,
    QrCodeInfoComponent,
    SafeHtmlPipe,
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
    FormsModule,
    PluralRuModule,
    SignaturePadModule,
    MatDialogModule,
    MatButtonModule,
    AngularYandexMapsModule,
    MatCheckboxModule,
    TranslateModule,
    MaskModule,
    LoaderModule,
  ],
  providers: [DatePipe],
})
export class ServicesRegistrationModule {}
