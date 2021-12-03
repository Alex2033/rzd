import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AccountService } from '../../../shared/services/account.service';
import { AuthDataInterface } from '../../types/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public nameControl: AbstractControl;
  public phoneControl: AbstractControl;
  public emailControl: AbstractControl;
  public emailConfirmControl: AbstractControl;
  public submitted: boolean = false;
  public isLoading: boolean = false;
  public smsInterval: number = 0;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  get phone(): AbstractControl {
    return this.registerForm.get('phone');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get emailConfirm(): AbstractControl {
    return this.registerForm.get('emailConfirm');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private account: AccountService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initializeValues();
    this.getFormLocalStorage();
    this.checkEmailsMatch();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  initializeValues(): void {
    this.nameControl = this.name;
    this.phoneControl = this.phone;
    this.emailControl = this.email;
    this.emailConfirmControl = this.emailConfirm;
  }

  checkEmailsMatch(): void {
    this.registerForm.valueChanges.subscribe(() => {
      if (this.email.value && this.email.value !== this.emailConfirm.value) {
        this.emailConfirm.setErrors({
          does_not_match: this.translate.instant('EMAIL_FIELDS_DONT_MATCH'),
        });
      } else {
        this.emailConfirm.setErrors(null);
      }
    });
  }

  getFormLocalStorage(): void {
    const savedData = JSON.parse(localStorage.getItem('registerForm'));

    if (savedData) {
      this.registerForm.patchValue(savedData);
      this.submitted = true;
    }
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
        Validators.pattern('^[+]*[]{0,1}[0-9]{1,4}[]{0,1}[\\s0-9]*$'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
      ]),
      emailConfirm: new FormControl(null),
      code: new FormGroup({
        control1: new FormControl(null, [Validators.required]),
        control2: new FormControl(null, [Validators.required]),
        control3: new FormControl(null, [Validators.required]),
        control4: new FormControl(null, [Validators.required]),
      }),
    });
  }

  submit(): void {
    this.router.navigate(['/cabinet', 'questionnaires']);
  }

  register(): void {
    this.isLoading = true;
    const newUser: AuthDataInterface = {
      email: this.email.value,
      name: this.name.value,
      phone: this.phone.value,
    };

    this.account
      .register(newUser)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(
        () => this.registerSuccess(),
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  registerSuccess(): void {
    this.submitted = true;
    this.registerForm.get('code').reset();
    localStorage.setItem(
      'registerForm',
      JSON.stringify(this.registerForm.value)
    );
  }

  setErrors(err: HttpErrorResponse): void {
    const { error, value } = err.error;

    switch (error) {
      case 'EMAIL_ALREADY_EXISTS':
        this.email.setErrors({
          not_unique_email: 'Этот email уже используется',
        });
        break;
      case 'PHONE_ALREADY_EXISTS':
        this.phone.setErrors({
          not_unique_phone: 'Номер телефона уже зарегистрирован',
        });
        break;
      case 'EMAIL_BAD_FORMAT':
        this.email.setErrors({
          email_bad_format: this.translate.instant('INVALID_EMAIL_FORMAT'),
        });
        break;
      case 'PHONE_BAD_FORMAT':
        this.phone.setErrors({
          phone_bad_format: this.translate.instant('INVALID_PHONE_FORMAT'),
        });
        break;
      case 'NAME_LENGTH':
        this.name.setErrors({
          incorrect_name_length: `Не более ${value} символов`,
        });
        break;
      case 'EMAIL_LENGTH':
        this.email.setErrors({
          incorrect_email_length: `Не более ${value} символов`,
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
    this.registerForm.markAllAsTouched();
  }

  handleKeypress(event: KeyboardEvent): void {
    if (event.which === 40 || event.which === 41 || event.which === 45) {
      event.preventDefault();
    }
  }
}
