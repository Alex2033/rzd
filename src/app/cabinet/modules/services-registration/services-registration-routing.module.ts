import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockingScreenComponent } from './blocking-screen/blocking-screen.component';
import { ConfirmOrderComponent } from './pages/confirm-order/confirm-order.component';
import { DocumentComponent } from './pages/document/document.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { PaymentResponseComponent } from './pages/payment-response/payment-response.component';
import { QuestionsComponent } from './pages/questions/questions.component';
import { ReturnDateComponent } from './pages/return-date/return-date.component';
import { SelectPointComponent } from './pages/select-point/select-point.component';
import { SelectServicesComponent } from './pages/select-services/select-services.component';
import { ServicesRegistrationInfoComponent } from './pages/services-registration-info/services-registration-info.component';
import { SignatureComponent } from './pages/signature/signature.component';

const routes: Routes = [
  {
    path: 'info',
    component: ServicesRegistrationInfoComponent,
  },
  {
    path: 'questions/:id',
    component: QuestionsComponent,
  },
  {
    path: 'return-date/:id',
    component: ReturnDateComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRegistrationRoutingModule {}
