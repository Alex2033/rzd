import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizeDatePipe } from './localize-date.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [LocalizeDatePipe],
  exports: [LocalizeDatePipe],
})
export class LocalizeDateModule {}
