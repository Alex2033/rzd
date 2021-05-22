import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';

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
