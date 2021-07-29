import { OrdersService } from './../../../../../shared/services/orders.service';
import { slideUpAnimation } from 'src/app/shared/animations/slide-up.animation';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServicesRegistrationService } from 'src/app/shared/services/services-registration.service';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';

@Component({
  selector: 'app-select-point',
  templateUrl: './select-point.component.html',
  styleUrls: ['./select-point.component.scss'],
  animations: [slideUpAnimation()],
})
export class SelectPointComponent implements OnInit, OnDestroy {
  public selectedId: number = 0;
  public points: ServicePointInterface[] = [];
  public addressMode: string = 'list';
  public mapOptions: object = {
    suppressMapOpenBlock: true,
  };
  public options: object = {
    iconImageHref: 'assets/gps-red.svg',
    iconLayout: 'default#image',
  };
  public selectedPoint: ServicePointInterface;
  public mapPoint: ServicePointInterface;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private servicePoints: ServicePointsService,
    public servicesRegistration: ServicesRegistrationService,
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this.servicePoints
      .getServicePoints()
      .pipe(takeUntil(this.destroy))
      .subscribe((points) => {
        this.points = points;
        this.points.forEach((p) => (p['selectedOnMap'] = false));
        const pointId = JSON.parse(
          sessionStorage.getItem('rzd-order')
        )?.id_point;
        this.selectedPoint = this.points.find((p) => p.id === pointId);
      });
  }

  getOrder(): void {
    this.route.params
      .pipe(switchMap((params) => this.ordersService.getOrder(+params.id)))
      .subscribe((res) => {
        if (res) {
          this.servicesRegistration.setOrder(res);
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  selectPoint(): void {
    this.servicesRegistration.setOrder({
      id_point: this.selectedPoint.id,
    });

    this.router.navigate([
      '/cabinet',
      'services-registration',
      'select-services',
      this.servicesRegistration.order.id,
    ]);
  }

  selectMapPoint(event, point: ServicePointInterface): void {
    // возможно сделать запоминание точки в session storage и сравнивать с выбранной точкой (костыль)
    // if (JSON.stringify(point) !== JSON.stringify(this.selectedPoint)) {
    //   event.target.options.set('iconImageHref', 'assets/gps-blue.svg');
    // }

    console.log('event:', event);
    // event.target.options.set('iconImageHref', 'assets/gps-blue.svg');
    this.selectedPoint = point;
  }
}
