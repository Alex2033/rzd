import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
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

  constructor(
    private services: ServicesService,
    private servicePoints: ServicePointsService
  ) {}

  ngOnInit(): void {
    this.services$ = this.services.getServices();
    this.servicePoints$ = this.servicePoints
      .getServicePoints()
      .pipe(shareReplay());
  }
}
