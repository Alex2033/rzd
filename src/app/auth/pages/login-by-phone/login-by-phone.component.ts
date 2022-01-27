import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { ReplaySubject, throwError } from 'rxjs';
import { takeUntil, finalize, switchMap } from 'rxjs/operators';
import { AccountService } from '../../../shared/services/account.service';
import { LoginDataInterface } from '../../types/login-data.interface';
import { captchaKey } from 'src/app/globals';

@Component({
  selector: 'app-login-by-phone',
  templateUrl: './login-by-phone.component.html',
  styleUrls: ['./login-by-phone.component.scss'],
})
export class LoginByPhoneComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public phoneControl: AbstractControl;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public smsInterval: number = 0;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get phone(): AbstractControl {
    return this.loginForm.get('phone');
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private account: AccountService,
    private translate: TranslateService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getQueryParams();
    this.phoneControl = this.phone;
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  getQueryParams(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const savedData = JSON.parse(localStorage.getItem('loginForm'));

      if (savedData) {
        this.loginForm.patchValue(savedData);

        if (!params['isError']) {
          this.submitted = true;
        }
      }
    });
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
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

  login(): void {
    this.isLoading = true;

    const data: LoginDataInterface = {
      phone: this.phone.value,
      useSms: true,
      PT: '',
      token: '',
      email: '',
    };

    this.account
      .prepareLogin(data)
      .pipe(
        switchMap((PT: string) => {
          data['PT'] = PT;
          return this.loadRecaptcha();
        }),
        switchMap((token: string) => {
          if (token) {
            return this.account.login({ ...data, token });
          } else {
            return throwError("There's no the token");
          }
        }),
        takeUntil(this.destroy),
        finalize(() => {
          this.setLoginData();
          this.isLoading = false;
        })
      )
      .subscribe(
        () => {
          this.submitted = true;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err);
          }
        }
      );
  }

  loadRecaptcha(): Promise<string> {
    return this.reCaptchaV3Service.executeAsPromise(captchaKey, 'login', {
      useGlobalDomain: false,
    });
  }

  setLoginData(): void {
    this.loginForm.get('code').reset();
    localStorage.setItem('loginForm', JSON.stringify(this.loginForm.value));
  }

  private setErrors(err: HttpErrorResponse): void {
    const { error, value } = this.parseError(err);

    const findTerm = (term) => {
      if (error.toLowerCase().includes(term.toLowerCase())) {
        return error;
      }
    };

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

      case 'PHONE_BAD_FORMAT':
        this.phone.setErrors({
          phone_bad_format: this.translate.instant('INVALID_PHONE_FORMAT'),
        });
        break;

      case 'SMS_ERROR':
        this.router.navigate(['/server-error', error]);
        break;

      case findTerm('FORBIDDEN'):
        this.router.navigate(['/auth', 'login-error'], {
          queryParams: { from: 'login-by-phone' },
        });
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

  parseError(err: HttpErrorResponse): any | null {
    try {
      return JSON.parse(err.error);
    } catch (e) {
      return err.error;
    }
  }

  submit(): void {
    this.router.navigate(['/cabinet', 'questionnaires']);
  }

  changeSubmitted(val: boolean): void {
    this.submitted = val;
    this.loginForm.markAllAsTouched();
  }

  handleKeypress(event: KeyboardEvent): void {
    if (event.which === 40 || event.which === 41 || event.which === 45) {
      event.preventDefault();
    }
  }

  loginToByEmail(): void {
    this.router.navigate(['/auth', 'login-by-email']);
    localStorage.removeItem('loginForm');
  }
}
