import { AbstractControl, ValidationErrors } from '@angular/forms';
import { checkSnils } from 'ru-validation-codes';

export function snilsValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value === '' || control.value === null) {
    return null;
  }

  return checkSnils(control.value) ? null : { snils: 'error' };
}
