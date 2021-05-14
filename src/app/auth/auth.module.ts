import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorMessagesComponent } from '../shared/components/error-messages/error-messages.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SmsInfoComponent } from './pages/sms-info/sms-info.component';
import { SmsConfirmComponent } from './components/sms-confirm/sms-confirm.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ErrorMessagesComponent,
    SmsInfoComponent,
    SmsConfirmComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AuthModule {}
