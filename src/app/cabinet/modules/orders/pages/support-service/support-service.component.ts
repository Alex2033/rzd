import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-support-service',
  templateUrl: './support-service.component.html',
  styleUrls: ['./support-service.component.scss'],
})
export class SupportServiceComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: new FormControl(null, [Validators.required]),
    });
  }

  back(): void {
    this.location.back();
  }

  submit(): void {
    this.router.navigate(['/cabinet', 'orders', 'support-response']);
  }
}
