import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { AccountService } from 'src/app/shared/services/account.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServiceInterface } from 'src/app/shared/types/service.interface';
import { ServicesService } from '../../../shared/services/services.service';
import { ServicePointInterface } from '../../../shared/types/service-point.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  animations: [slideUpAnimation()],
})
export class IndexComponent implements OnInit {
  public services$: Observable<ServiceInterface[]>;
  public servicePoints$: Observable<ServicePointInterface[]>;
  public isAuth: boolean;
  public addressMode: string = 'map';
  public mapOptions: object = {
    suppressMapOpenBlock: true,
  };
  public options: object = {
    iconImageHref: 'assets/gps-red.svg',
    iconLayout: 'default#image',
  };
  public selectedPoint: ServicePointInterface;

  constructor(
    private services: ServicesService,
    private servicePoints: ServicePointsService,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.services$ = this.services.getServices();
    this.servicePoints$ = this.servicePoints
      .getServicePoints()
      .pipe(shareReplay());
    this.isAuth = this.account.isAuth();
  }
}
