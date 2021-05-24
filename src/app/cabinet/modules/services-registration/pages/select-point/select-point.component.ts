import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';

@Component({
  selector: 'app-select-point',
  templateUrl: './select-point.component.html',
  styleUrls: ['./select-point.component.scss'],
})
export class SelectPointComponent implements OnInit {
  public selectedId: number = 0;
  public points$: Observable<ServicePointInterface[]>;

  constructor(
    private servicePoints: ServicePointsService,
    public servicesRegistration: ServicesRegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.points$ = this.servicePoints.getServicePoints();
    this.selectedId = JSON.parse(sessionStorage.getItem('rzd-order')).id_point;
  }

  selectPoint(): void {
    this.servicesRegistration.setOrder({
      id_point: this.selectedId,
    });

    this.router.navigate([
      '/cabinet',
      'services-registration',
      'select-services',
      this.servicesRegistration.order.id,
    ]);
  }
}
