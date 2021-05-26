import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  public services$: Observable<ServiceInterface[]>;
  public servicePoints$: Observable<ServicePointInterface[]>;
  public isAuth: boolean;

  constructor(
    private services: ServicesService,
    private servicePoints: ServicePointsService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.services$ = this.services.getServices();
    this.servicePoints$ = this.servicePoints
      .getServicePoints()
      .pipe(shareReplay());
    this.isAuth = this.auth.isAuth();
  }
}
