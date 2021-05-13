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
import { Observable, ReplaySubject, Subject, timer } from 'rxjs';
import { takeUntil, take, map, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { SmsConfirmInterface } from '../../types/sms-confirm.interface';

@Component({
  selector: 'app-sms-confirm',
  templateUrl: './sms-confirm.component.html',
  styleUrls: ['./sms-confirm.component.scss'],
})
export class SmsConfirmComponent implements OnInit, OnDestroy {
  @ViewChild('otc') otc: ElementRef;

  @Output() submit: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() changeResendCode: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() codeForm: FormGroup;
  @Input() phoneValue: string;
  @Input() resendCode: boolean;

  //todo: После того как сделать страницей, это убрать
  @Input() isLogin: boolean = false;

  public confirmError: string;
  public counter$: Observable<number>;
  public isLoading: boolean = false;
  public timeExpired: boolean = false;

  private count: number = 60;
  private readonly stopTimer = new Subject<void>();
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.setTimer();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
    this.stopTimer.next();
  }

  getNewSmsCode(): void {
    this.auth
      .reInvite(this.phoneValue)
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => {
        this.codeForm.reset();
        this.confirmError = '';
        this.timeExpired = false;

        // todo: убрать
        alert('Код: ' + res);
      });
    this.setTimer();
  }

  setTimer(): void {
    this.resetSmsTimer();

    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count),
      takeUntil(this.stopTimer),
      finalize(() => {
        this.changeResendCode.emit(true);
      })
    );
  }

  back(): void {
    this.submitted.emit(false);
    this.resetSmsTimer();
    this.confirmError = '';
  }

  resetSmsTimer(): void {
    this.count = 60;
    this.stopTimer.next();
    this.changeResendCode.emit(false);
  }

  inputKeyup(inputNum: HTMLInputElement, e: any): void {
    const valueLength = inputNum.value.length;
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

    if (inputNum.value.length > inputNum.maxLength) {
      inputNum.value = inputNum.value.slice(0, inputNum.maxLength);
    }

    if (
      (e.keyCode === 8 || e.keyCode === 37) &&
      previousSibling &&
      previousSibling.tagName === 'INPUT'
    ) {
      previousSibling.select();
    } else if (e.keyCode !== 8 && nextSibling && valueLength === 1) {
      (<HTMLInputElement>nextSibling).select();
    }

    this.codeIsValidated();
  }

  codeIsValidated(): void {
    if (this.codeForm.valid) {
      const values: string = Object.values(this.codeForm.value).join('');

      const confirmCode: SmsConfirmInterface = {
        phone: this.phoneValue,
        code: values,
      };

      this.isLoading = true;

      this.isLogin
        ? this.confirmLogin(confirmCode)
        : this.confirmRegistration(confirmCode);
    }
  }

  confirmLogin(confirmCode: SmsConfirmInterface): void {
    this.auth
      .confirmLogin(confirmCode)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy)
      )
      .subscribe(
        () => {
          this.submit.emit();
        },
        (err: HttpErrorResponse) => {
          this.handleError(err.error.error);
        }
      );
  }

  confirmRegistration(confirmCode: SmsConfirmInterface): void {
    this.auth
      .confirmInvite(confirmCode)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.destroy)
      )
      .subscribe(
        () => {
          this.submit.emit();
        },
        (err: HttpErrorResponse) => {
          this.handleError(err.error.error);
        }
      );
  }

  handleError(err: string): void {
    switch (err) {
      case 'SMS_AGE':
        this.timeExpired = true;
        break;
      case 'SMS_ERROR':
        this.confirmError = 'Ошибка отправки кода';
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
    if (inputNum === this.otc.nativeElement) return;

    if (this.otc.nativeElement.value == '') {
      this.otc.nativeElement.focus();
    }
  }
}
