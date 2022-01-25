import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesModule } from '../shared/modules/error-messages/error-messages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SmsConfirmModule } from '../shared/modules/sms-confirm/sms-confirm.module';

import { SmsInfoComponent } from './pages/sms-info/sms-info.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterErrorComponent } from './pages/register-error/register-error.component';
import { LoginByPhoneComponent } from './pages/login-by-phone/login-by-phone.component';
import { LoginByEmailComponent } from './pages/login-by-email/login-by-email.component';

@NgModule({
  declarations: [
    LoginByPhoneComponent,
    RegisterComponent,
    SmsInfoComponent,
    RegisterErrorComponent,
    LoginByEmailComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorMessagesModule,
    SmsConfirmModule,
    TranslateModule,
  ],
})
export class AuthModule {}
