import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public nameControl: AbstractControl;
  public phoneControl: AbstractControl;
  public emailControl: AbstractControl;

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  get phone(): AbstractControl {
    return this.registerForm.get('phone');
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.initializeValues();
  }

  initializeValues(): void {
    this.nameControl = this.name;
    this.phoneControl = this.phone;
    this.emailControl = this.email;
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(11),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  submit(): void {}
}
