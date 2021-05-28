import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss'],
})
export class WorkplaceComponent implements OnInit {
  @Input() workplace: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.companyControlChanges();
  }

  toggleWorkplaceValidators(): void {
    if (this.workplace.get('company').value) {
      this.workplace
        .get('company_address')
        .setValidators([Validators.required]);
      this.workplace.get('position').setValidators([Validators.required]);
    } else {
      this.workplace.get('company_address').clearValidators();
      this.workplace.get('position').clearValidators();
    }

    this.workplace.get('company_address').updateValueAndValidity();
    this.workplace.get('position').updateValueAndValidity();
  }

  companyControlChanges(): void {
    this.workplace.get('company').valueChanges.subscribe(() => {
      this.toggleWorkplaceValidators();
    });
  }
}
