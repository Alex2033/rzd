import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServicePointsService } from '../../services/service-points.service';
import { ServicesService } from '../../services/services.service';
import { ServicePointInterface } from '../../types/service-point.interface';
import { ServiceInterface } from '../../types/service.interface';

@Component({
  selector: 'app-service-point-detail',
  templateUrl: './service-point-detail.component.html',
  styleUrls: ['./service-point-detail.component.scss'],
})
export class ServicePointDetailComponent implements OnInit {
  public point$: Observable<ServicePointInterface>;
  public services$: Observable<ServiceInterface[]>;

  constructor(
    private route: ActivatedRoute,
    private points: ServicePointsService,
    private services: ServicesService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.point$ = this.points.getServicePoint(+params.id);
          this.services$ = this.services.getServices(+params.id);
          return of();
        })
      )
      .subscribe();
  }
}
