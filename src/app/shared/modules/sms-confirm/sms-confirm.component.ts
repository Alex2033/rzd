import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, Subject, throwError, timer } from 'rxjs';
import { takeUntil, take, map, tap, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';
import { CodeConfirmInterface } from 'src/app/auth/types/code-confirm.interface';
import { CheckCodeDataInterface } from '../../types/code-data.interface';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { captchaKey } from 'src/app/globals';
import { LoginDataInterface } from 'src/app/auth/types/login-data.interface';

@Component({
  selector: 'app-sms-confirm',
  templateUrl: './sms-confirm.component.html',
  styleUrls: ['./sms-confirm.component.scss'],
})
export class SmsConfirmComponent implements OnInit, OnDestroy {
  @ViewChild('otc') otc: ElementRef;

  @Output() submit: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() codeForm: FormGroup;
  @Input() value: string;
  @Input() smsInterval: number;
  @Input() isSms: boolean = true;

  // todo: После того как сделать страницей, это убрать
  @Input() isLogin: boolean = false;
  @Input() isEditPhone: boolean = false;

  public resendCode: boolean = false;
  public confirmError: string;
  public counter$: Observable<number>;
  public isLoading: boolean = false;
  public timeExpired: boolean = false;

  private count: number = 60;
  private readonly stopTimer: Subject<void> = new Subject<void>();
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private account: AccountService,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.setTimer();
    this.codeFormChanges();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
    this.stopTimer.next();
  }

  codeFormChanges(): void {
    this.codeForm.valueChanges.subscribe(() => {
      this.validateCode();
    });
  }

  resend(): void {
    const data: CheckCodeDataInterface = {
      [this.isSms ? 'phone' : 'email']: this.value,
      isProfilePhone: true,
    };

    let type: string = 'reinvite';
    if (this.isLogin) {
      type = 'login';
      this.login();
    } else {
      if (this.isEditPhone) type = 'check_phone';
      const value: string | CheckCodeDataInterface =
        type === 'check_phone' ? data : this.value;
      this.getNewCode(type, value, this.isSms ? 'phone' : 'email');
    }

    this.setTimer();
  }

  login(): void {
    const loginData: LoginDataInterface = {
      phone: this.isSms ? this.value : '',
      useSms: this.isSms,
      PT: '',
      token: '',
      email: this.isSms ? '' : this.value,
    };

    this.account
      .prepareLogin(loginData)
      .pipe(
        switchMap((PT: string) => {
          loginData['PT'] = PT;
          this.newCodeSuccess();
          return this.loadRecaptcha();
        }),
        switchMap((token: string) => {
          if (token) {
            return this.account.login({ ...loginData, token });
          } else {
            return throwError("There's no the token");
          }
        }),
        takeUntil(this.destroy)
      )
      .subscribe(
        () => {
          this.newCodeSuccess();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err.error.error);
            this.isLoading = false;
          }
        }
      );
  }

  getNewCode(
    type: string,
    value: string | CheckCodeDataInterface,
    format?: string
  ): void {
    this.account
      .getNewCode(type, value, format)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        () => {
          this.newCodeSuccess();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err.error.error);
            this.isLoading = false;
          }
        }
      );
  }

  loadRecaptcha(): Promise<string> {
    return this.reCaptchaV3Service.executeAsPromise(captchaKey, 'login', {
      useGlobalDomain: false,
    });
  }

  newCodeSuccess(): void {
    this.codeForm.reset();
    this.confirmError = '';
    this.timeExpired = false;
  }

  setTimer(): void {
    this.resetSmsTimer();

    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count),
      tap((value) => {
        if (value === 0) {
          this.resendCode = true;
        }
      }),
      takeUntil(this.stopTimer)
    );
  }

  back(): void {
    this.submitted.emit(false);
    this.resetSmsTimer();
    this.confirmError = '';
  }

  resetSmsTimer(): void {
    if (this.smsInterval > 0) {
      this.count = this.smsInterval;
    } else {
      this.count = 60;
    }
    this.smsInterval = 0;
    this.stopTimer.next();
    this.resendCode = false;
  }

  splitNumber(e: any): void {
    let data = e.data || e.target.value;
    if (!data) return;
    if (data.length === 1) return;

    this.popuNext(e.target, data);
  }

  popuNext(el, data): void {
    el.value = data[0];
    data = data.substring(1);
    if (el.nextElementSibling && data.length) {
      this.popuNext(el.nextElementSibling, data);
    }
  }

  inputKeyup(inputNum: HTMLInputElement, e: any): void {
    const previousSibling = <HTMLInputElement>inputNum.previousElementSibling;
    const nextSibling = <HTMLInputElement>inputNum.nextElementSibling;

    if (
      e.keyCode === 16 ||
      e.keyCode == 9 ||
      e.keyCode == 224 ||
      e.keyCode == 18 ||
      e.keyCode == 17
    ) {
      return;
    }

    if (
      (e.keyCode === 8 || e.keyCode === 37) &&
      previousSibling &&
      previousSibling.tagName === 'INPUT'
    ) {
      previousSibling.select();
    } else if (e.keyCode !== 8 && nextSibling) {
      nextSibling.select();
    }

    if (e.target.value.length > 1) {
      this.splitNumber(e);
    }
  }

  validateCode(): void {
    if (this.codeForm.valid) {
      this.isLoading = true;

      const code: string = Object.values(this.codeForm.value).join('');

      const confirmCode: CodeConfirmInterface = {
        [this.isSms ? 'phone' : 'email']: this.value,
        code,
      };

      let type: string = 'confirm_invite';

      if (this.isLogin) type = 'confirm_login';

      if (this.isEditPhone) type = 'confirm_check_phone';

      this.confirm(type, confirmCode);
    }
  }

  confirm(type: string, confirmCode: CodeConfirmInterface): void {
    this.account
      .confirm(type, confirmCode)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        () => {
          this.submit.emit();
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err.error.error);
            this.isLoading = false;
          }
        }
      );
  }

  handleError(err: string): void {
    switch (err) {
      case 'SMS_AGE':
        this.timeExpired = true;
        break;
      case 'SMS_ERROR':
        this.router.navigate(['/server-error', err]);
        break;
      default:
        this.confirmError = 'Введен неверный код';
        break;
    }
  }

  check(inputNum: HTMLInputElement, e: any): void {
    const previousSibling = <HTMLInputElement>inputNum.previousElementSibling;
    const nextSibling = <HTMLInputElement>inputNum.nextElementSibling;

    if ((e.keyCode === 8 || e.keyCode === 37) && previousSibling) {
      previousSibling.select();
    } else if (e.keyCode === 39 && nextSibling) {
      nextSibling.select();
    }
  }

  inputFocus(inputNum: HTMLInputElement): void {
    const previousSibling = <HTMLInputElement>inputNum.previousElementSibling;

    if (inputNum === this.otc.nativeElement) return;

    if (this.otc.nativeElement.value == '') {
      this.otc.nativeElement.focus();
    }

    if (previousSibling && previousSibling.value == '') {
      previousSibling.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
    const clipboardData: DataTransfer = event.clipboardData;
    const pastedText: string = clipboardData.getData('text');

    setTimeout(() => {
      Object.values(this.codeForm.value).forEach((_, index) => {
        this.codeForm.get(`control${index + 1}`).setValue(+pastedText[index]);
      });
    });
  }
}
