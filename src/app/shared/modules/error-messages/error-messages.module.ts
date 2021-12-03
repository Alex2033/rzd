import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessagesComponent } from './error-messages.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  declarations: [ErrorMessagesComponent],
  exports: [ErrorMessagesComponent],
})
export class ErrorMessagesModule {}
