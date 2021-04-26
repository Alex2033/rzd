import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, Subject, timer } from 'rxjs';
import { finalize, map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('otc') otc: ElementRef;
  @ViewChild('phone') phoneRef: ElementRef;

  public registerForm: FormGroup;
  public nameControl: AbstractControl;
  public phoneControl: AbstractControl;
  public emailControl: AbstractControl;
  public counter$: Observable<number>;
  public submitted: boolean = false;
  public resendCode: boolean = false;
  public isLoading: boolean = false;

  private count: number = 60;
  private readonly stopTimer = new Subject<void>();
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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
    this.initializeValues();
    this.getFormLocalStorage();
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
    this.stopTimer.next();
  }

  getFormLocalStorage(): void {
    const savedData = JSON.parse(localStorage.getItem('registerForm'));

    if (savedData) {
      this.registerForm.patchValue(savedData);
      this.submitted = true;
      this.setTimer();
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
      code: new FormGroup({
        control1: new FormControl(null, [Validators.required]),
        control2: new FormControl(null, [Validators.required]),
        control3: new FormControl(null, [Validators.required]),
        control4: new FormControl(null, [Validators.required]),
      }),
    });
  }

  initializeValues(): void {
    this.nameControl = this.name;
    this.phoneControl = this.phone;
    this.emailControl = this.email;
  }

  setTimer(): void {
    this.resetSmsTimer();
    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count),
      takeUntil(this.stopTimer),
      finalize(() => {
        this.resendCode = true;
      })
    );
  }

  resetSmsTimer(): void {
    this.count = 60;
    this.stopTimer.next();
    this.resendCode = false;
  }

  submit(): void {
    // todo: Проверить совпадает ли введенный код с необходимым

    this.router.navigate(['auth', 'login']);
  }

  codeIsValidated(): void {
    if (this.registerForm.get('code').valid) {
      this.isLoading = true;

      // todo: убрать этот таймер, когда будет идти ответ с сервера
      timer(2000)
        .pipe(takeUntil(this.destroy))
        .subscribe(() => this.submit());
    }
  }

  register(): void {
    this.setTimer();
    // todo: логика для отправки смс

    this.submitted = true;
    this.registerForm.get('code').reset();
    localStorage.setItem(
      'registerForm',
      JSON.stringify(this.registerForm.value)
    );
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

  back(): void {
    this.submitted = false;
    this.resetSmsTimer();
    setTimeout(() => {
      this.phoneRef.nativeElement.select();
    }, 0);
  }
}
