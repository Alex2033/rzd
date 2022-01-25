import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';
import { CheckCodeDataInterface } from 'src/app/shared/types/code-data.interface';
import { EditableFieldInterface } from '../../types/editable-field.interface';
import { CreateSheetComponent } from '../create-sheet/create-sheet.component';

@Component({
  selector: 'app-edit-phone-modal',
  templateUrl: './edit-phone-modal.component.html',
  styleUrls: ['./edit-phone-modal.component.scss'],
})
export class EditPhoneModalComponent implements OnInit {
  public form: FormGroup;
  public smsInterval: number = 0;
  public submitted: boolean = false;
  public isLoading: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    public _bottomSheetRef: MatBottomSheetRef<CreateSheetComponent>,
    private formBuilder: FormBuilder,
    private account: AccountService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { value: string },
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.form.get('phone').setValue(this.data.value, { emitEvent: false });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.pattern('^[+]*[]{0,1}[0-9]{1,4}[]{0,1}[\\s0-9]*$'),
      ]),
      code: new FormGroup({
        control1: new FormControl(null, [Validators.required]),
        control2: new FormControl(null, [Validators.required]),
        control3: new FormControl(null, [Validators.required]),
        control4: new FormControl(null, [Validators.required]),
      }),
    });
  }

  submit(): void {
    const data: EditableFieldInterface = {
      type: 'phone',
      value: this.form.get('phone').value,
    };
    this._bottomSheetRef.dismiss(data);
  }

  setValueFromProfile(): void {
    this.form.get('phone').setValue(this.account.user$.value.phone);
  }

  handleKeypress(event: KeyboardEvent): void {
    if (event.which === 40 || event.which === 41 || event.which === 45) {
      event.preventDefault();
    }
  }

  checkPhone(): void {
    this.isLoading = true;

    const phoneData: CheckCodeDataInterface = {
      phone: this.form.get('phone').value,
      isProfilePhone: false,
    };

    this.account
      .checkPhone(phoneData)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        () => {
          this.submitted = true;
          this.form.get('code').reset();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  private setErrors(err: HttpErrorResponse): void {
    const { error, value } = err.error;

    switch (error) {
      case 'PHONE_ALREADY_EXISTS':
        this.form.get('phone').setErrors({
          not_unique_phone: 'Номер телефона уже занят',
        });
        break;

      case 'PHONE_BAD_FORMAT':
        this.form.get('phone').setErrors({
          phone_bad_format: this.translate.instant('INVALID_PHONE_FORMAT'),
        });
        break;

      case 'SMS_INTERVAL':
        this.smsInterval = value;
        this.submitted = true;
        break;

      default:
        break;
    }
  }

  changeSubmitted(val: boolean): void {
    this.submitted = val;
  }
}
