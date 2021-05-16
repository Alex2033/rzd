import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorMessagesComponent } from './error-messages.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ErrorMessagesComponent],
  exports: [ErrorMessagesComponent],
})
export class ErrorMessagesModule {}
