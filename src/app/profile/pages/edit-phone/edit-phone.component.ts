import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthResponseInterface } from 'src/app/auth/types/auth-response.interface';
import { CheckPhoneDataInterface } from 'src/app/shared/types/phone-data.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss'],
})
export class EditPhoneComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public user: AuthResponseInterface = {} as AuthResponseInterface;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public smsInterval: number = 0;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private account: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createForm();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getUser(): void {
    this.account
      .getUser()
      .pipe(takeUntil(this.destroy))
      .subscribe((user) => (this.user = user));
  }

  createForm(): void {
    this.editForm = this.formBuilder.group({
      phone: new FormControl(this.user.phone, [
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

  checkPhone(): void {
    this.isLoading = true;

    const phoneData: CheckPhoneDataInterface = {
      phone: this.editForm.get('phone').value,
      isProfilePhone: true,
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
          this.editForm.get('code').reset();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  submit(): void {
    this.isLoading = true;

    const updatedUser: AuthResponseInterface = {
      ...this.user,
      phone: this.editForm.get('phone').value,
    };
    this.account
      .updateUser(updatedUser)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        () => {
          this.router.navigate(['/']);
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
        this.editForm.get('phone').setErrors({
          not_unique_phone: 'Номер телефона уже занят',
        });
        break;

      case 'PHONE_BAD_FORMAT':
        this.editForm.get('phone').setErrors({
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
    this.editForm.markAllAsTouched();
  }

  handleKeypress(event: KeyboardEvent): void {
    if (event.which === 40 || event.which === 41 || event.which === 45) {
      event.preventDefault();
    }
  }
}
