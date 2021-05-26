import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';

@Component({
  selector: 'app-services-registration-info',
  templateUrl: './services-registration-info.component.html',
  styleUrls: ['./services-registration-info.component.scss'],
})
export class ServicesRegistrationInfoComponent implements OnInit {
  constructor(
    private router: Router,
    private servicesRegistration: ServicesRegistrationService
  ) {}

  ngOnInit(): void {}

  goToCreation(): void {
    this.router.navigate([
      '/cabinet',
      'services-registration',
      'questions',
      this.servicesRegistration.order.id,
    ]);
  }
}
