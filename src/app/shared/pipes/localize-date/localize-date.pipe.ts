import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizeDate',
  pure: false,
})
export class LocalizeDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: any, pattern: string = 'mediumDate'): string {
    const lang: string =
      this.translateService.currentLang === '1' ? 'ru' : 'en-US';
    const datePipe: DatePipe = new DatePipe(lang);
    return datePipe.transform(value, pattern);
  }
}
