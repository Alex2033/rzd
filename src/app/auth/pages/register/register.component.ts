import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
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
  public resendCode: boolean = false;
  public registrationLoading: boolean = false;

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
    private auth: AuthService,
    private route: ActivatedRoute
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
          does_not_match: 'Поля Email не совпадают',
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
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
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
    this.router.navigate(['/']);
  }

  register(): void {
    this.registrationLoading = true;
    const newUser: AuthDataInterface = {
      email: this.email.value,
      name: this.name.value,
      phone: this.phone.value,
    };

    this.auth
      .register(newUser)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.registrationLoading = false))
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
      default:
        break;
    }
  }

  changeSubmitted(val: boolean): void {
    this.submitted = val;
    this.registerForm.markAllAsTouched();
  }
}
