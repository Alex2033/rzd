import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('otc') otc: ElementRef;
  @ViewChild('phone') phoneRef: ElementRef;

  public registerForm: FormGroup;
  public nameControl: AbstractControl;
  public phoneControl: AbstractControl;
  public emailControl: AbstractControl;
  public submitted: boolean = true;
  public counter$: Observable<number>;
  public resendCode: boolean = false;

  private count: number = 60;

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
  }

  initializeValues(): void {
    this.nameControl = this.name;
    this.phoneControl = this.phone;
    this.emailControl = this.email;
  }

  timer(): void {
    this.counter$ = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count),
      finalize(() => {
        this.resendCode = true;
      })
    );
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

  submit(): void {
    // todo: Проверить совпадает ли введенный код с необходимым

    this.router.navigate(['auth', 'login']);
  }

  codeIsValidated(): void {
    if (this.registerForm.get('code').valid) {
      this.submit();
    }
  }

  register(): void {
    this.timer();
    // todo: логика для отправки смс

    this.submitted = true;
    this.registerForm.get('code').reset();
  }

  inputKeyup(inputNum: HTMLInputElement, e: any): void {
    const valueLength = inputNum.value.length;
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
      inputNum.previousElementSibling &&
      inputNum.previousElementSibling.tagName === 'INPUT'
    ) {
      (<HTMLInputElement>inputNum.previousElementSibling).select();
    } else if (
      e.keyCode !== 8 &&
      inputNum.nextElementSibling &&
      valueLength === 1
    ) {
      (<HTMLInputElement>inputNum.nextElementSibling).select();
    }

    this.codeIsValidated();
  }

  check(inputNum: HTMLInputElement, e: any): void {
    if (
      (e.keyCode === 8 || e.keyCode === 37) &&
      inputNum.previousElementSibling
    ) {
      (<HTMLInputElement>inputNum.previousElementSibling).select();
    } else if (e.keyCode === 39 && inputNum.nextElementSibling) {
      (<HTMLInputElement>inputNum.nextElementSibling).select();
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
    setTimeout(() => {
      this.phoneRef.nativeElement.select();
    }, 0);
  }
}
