import { DatePipe } from '@angular/common';
import { NativeDateAdapter } from '@angular/material/core';

export interface DateDisplay {
  year: string;
  month: string;
  day: string;
}

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'customInput',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'long', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

export class CustomDatePickerAdapter extends NativeDateAdapter {
  parse(value: string | number): Date | null {
    if (typeof value === 'string' && value.indexOf('.') > -1) {
      const str: string[] = value.split('.');
      if (
        str.length < 2 ||
        isNaN(+str[0]) ||
        isNaN(+str[1]) ||
        isNaN(+str[2])
      ) {
        return null;
      }
      if (this.locale === 'en-US') {
        return new Date(Number(str[2]), Number(str[0]) - 1, Number(str[1]));
      }
      return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]));
    }
    const timestamp: number =
      typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, display: string | DateDisplay): string {
    if (display === 'customInput') {
      if (this.locale === 'en-US') {
        return new DatePipe(this.locale).transform(date, 'MM.dd.yyyy');
      } else {
        return new DatePipe(this.locale).transform(date, 'dd.MM.yyyy');
      }
    } else {
      return new DatePipe(this.locale).transform(date, 'MMM yyyy');
    }
  }
}
