import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SmsConfirmComponent } from './sms-confirm.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  declarations: [SmsConfirmComponent],
  exports: [SmsConfirmComponent],
})
export class SmsConfirmModule {}
