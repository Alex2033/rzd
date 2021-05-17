import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicesService } from '../../services/services.service';
import { ServicePointInterface } from '../../types/service-point.interface';
import { ServiceInterface } from '../../types/service.interface';

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

  goToProfile(): void {
    this.isAuth
      ? this.router.navigate(['/profile'])
      : this.router.navigate(['/auth', 'login']);
  }
}
