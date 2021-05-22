import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public phoneControl: AbstractControl;
  public loginLoading: boolean = false;
  public resendCode: boolean = false;
  public submitted: boolean = false;
  public smsInterval: number = 0;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get phone(): AbstractControl {
    return this.loginForm.get('phone');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.phoneControl = this.phone;
    this.getFormLocalStorage();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getFormLocalStorage(): void {
    const savedData = JSON.parse(localStorage.getItem('loginForm'));

    if (savedData) {
      this.loginForm.patchValue(savedData);
      this.submitted = true;
    }
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
      code: new FormGroup({
        control1: new FormControl(null, [Validators.required]),
        control2: new FormControl(null, [Validators.required]),
        control3: new FormControl(null, [Validators.required]),
        control4: new FormControl(null, [Validators.required]),
      }),
    });
  }

  login(): void {
    this.loginLoading = true;

    this.auth
      .login(this.phone.value)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => (this.loginLoading = false))
      )
      .subscribe(
        () => {
          this.loginSuccess();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  loginSuccess(): void {
    this.submitted = true;
    this.loginForm.get('code').reset();
    localStorage.setItem('loginForm', JSON.stringify(this.loginForm.value));
  }

  private setErrors(err: HttpErrorResponse): void {
    const { error, value } = err.error;

    switch (error) {
      case 'PHONE_NOT_FOUND':
        this.phone.setErrors({
          not_found: 'Пользователь с таким номером не найден',
        });
        break;
      case 'SMS_INTERVAL':
        this.smsInterval = value;
        this.submitted = true;
        break;

      default:
        break;
    }

    switch (value) {
      case 'CREATED':
      case 'REGISTERED':
        this.phone.setErrors({
          exists_without_confirm: 'Пользователь не подтвержден',
        });
        break;
      case 'BLOCKED':
        this.phone.setErrors({
          blocked: 'Пользователь заблокирован',
        });
        break;
      default:
        break;
    }
  }

  submit(): void {
    this.router.navigate(['/']);
  }

  changeSubmitted(val: boolean): void {
    this.submitted = val;
    this.loginForm.markAllAsTouched();
  }
}
