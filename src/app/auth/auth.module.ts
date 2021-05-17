import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ErrorMessagesModule } from '../shared/modules/error-messages/error-messages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SmsConfirmModule } from '../shared/modules/sms-confirm/sms-confirm.module';

import { SmsInfoComponent } from './pages/sms-info/sms-info.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, SmsInfoComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    ErrorMessagesModule,
    SmsConfirmModule,
  ],
})
export class AuthModule {}
