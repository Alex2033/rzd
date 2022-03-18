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
  selector: 'app-login-by-email',
  templateUrl: './login-by-email.component.html',
  styleUrls: ['./login-by-email.component.scss'],
})
export class LoginByEmailComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public emailControl: AbstractControl;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public smsInterval: number = 0;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  get email(): AbstractControl {
    return this.loginForm.get('email');
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
    this.emailControl = this.email;
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
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
        ),
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
      phone: '',
      useSms: false,
      PT: '',
      token: '',
      email: this.email.value,
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
        (data) => {
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
      case 'EMAIL_NOT_FOUND':
        this.email.setErrors({
          email_not_found: 'Этот email не найден',
        });
        break;

      case 'EMAIL_ALREADY_EXISTS':
        this.email.setErrors({
          not_unique_email: 'Этот email уже используется',
        });
        break;

      case 'EMAIL_BAD_FORMAT':
        this.email.setErrors({
          email_bad_format: this.translate.instant('INVALID_EMAIL_FORMAT'),
        });
        break;

      case 'SMS_INTERVAL':
        this.smsInterval = value;
        this.submitted = true;
        break;

      case findTerm('FORBIDDEN'):
        this.router.navigate(['/auth', 'login-error'], {
          queryParams: { from: 'login-by-email' },
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

  loginToByPhone(): void {
    this.router.navigate(['/auth', 'login-by-phone']);
    localStorage.removeItem('loginForm');
  }
}
