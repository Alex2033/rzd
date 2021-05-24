import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';

@Component({
  selector: 'app-return-date',
  templateUrl: './return-date.component.html',
  styleUrls: ['./return-date.component.scss'],
})
export class ReturnDateComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public servicesRegistration: ServicesRegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      abroad_return_date: new FormControl(
        this.servicesRegistration.order.abroad_return_date,
        [Validators.required]
      ),
    });
  }

  submit(): void {
    const abroad_return_date = this.form.get('abroad_return_date').value;

    this.servicesRegistration.setOrder({
      ...this.servicesRegistration.order,
      abroad_return_date,
      been_abroad: true,
    });

    this.router.navigate([
      '/cabinet',
      'services-registration',
      'questions',
      this.servicesRegistration.order.id,
    ]);
  }
}
