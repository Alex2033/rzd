import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SmsConfirmComponent } from './sms-confirm.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    NgxCaptchaModule,
  ],
  declarations: [SmsConfirmComponent],
  exports: [SmsConfirmComponent],
})
export class SmsConfirmModule {}
