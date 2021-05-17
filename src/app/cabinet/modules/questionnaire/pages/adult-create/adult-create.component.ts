import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-adult-create',
  templateUrl: './adult-create.component.html',
  styleUrls: ['./adult-create.component.scss'],
})
export class AdultCreateComponent implements OnInit {
  public createForm: FormGroup;
  public currentStep: number = 1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      firstStep: new FormGroup({
        name: new FormControl('', Validators.required),
        name_lat: new FormControl('', [Validators.required]),
        surname: new FormControl('', Validators.required),
        surname_lat: new FormControl('', [Validators.required]),
        patronymic: new FormControl(''),
        birthday: new FormControl('', [Validators.required]), // проверить на правильность введенных данных
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required]),
        sex: new FormControl('', [Validators.required]),
      }),
    });
  }

  submit(): void {}
}
