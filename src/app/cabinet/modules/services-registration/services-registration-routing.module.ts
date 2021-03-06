import { QrCodeInfoComponent } from './pages/qr-code-info/qr-code-info.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockingScreenComponent } from './pages/blocking-screen/blocking-screen.component';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { DocumentComponent } from './pages/document/document.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentResponseComponent } from './pages/payment-response/payment-response.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { SelectPointComponent } from './pages/select-point/select-point.component';
import { SelectServicesComponent } from './pages/select-services/select-services.component';
import { ServicesRegistrationInfoComponent } from './pages/services-registration-info/services-registration-info.component';
import { SignatureComponent } from './pages/signature/signature.component';
import { EmptyQuestionnairesComponent } from './pages/empty-questionnaires/empty-questionnaires.component';

const routes: Routes = [
  {
    path: 'info',
    component: ServicesRegistrationInfoComponent,
  },
  {
    path: 'qr-code-info',
    component: QrCodeInfoComponent,
  },
  {
    path: 'questions/:id',
    component: QuestionsComponent,
  },
  {
    path: 'blocking-screen',
    component: BlockingScreenComponent,
  },
  {
    path: 'select-point/:id',
    component: SelectPointComponent,
  },
  {
    path: 'select-services/:id',
    component: SelectServicesComponent,
  },
  {
    path: 'document/:id',
    component: DocumentComponent,
  },
  {
    path: 'signature/:id',
    component: SignatureComponent,
  },
  {
    path: 'confirm/:id',
    component: ConfirmOrderComponent,
  },
  {
    path: 'payment-method/:id',
    component: PaymentMethodComponent,
  },
  {
    path: 'payment-response/:id',
    component: PaymentResponseComponent,
  },
  {
    path: 'empty-questionnaires',
    component: EmptyQuestionnairesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRegistrationRoutingModule {}
