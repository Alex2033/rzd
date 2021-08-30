import { LocationService } from 'src/app/shared/services/location.service';
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
  public options = {
    iconImageHref: 'assets/gps-red.svg',
    iconLayout: 'default#image',
  };
  public selectedPoint: ServicePointInterface;
  public mapPoint: ServicePointInterface;

  private selectedPlacemark;
  private geoObjects: any[] = [];
  private uniqueGeoObjects: any[] = [];
  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    public servicesRegistration: ServicesRegistrationService,
    private servicePoints: ServicePointsService,
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute,
    private location: LocationService
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this.getPoints();
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

  getPoints(): void {
    this.location.currentLocation$
      .pipe(
        switchMap(() => this.servicePoints.getServicePoints()),
        takeUntil(this.destroy)
      )
      .subscribe((points) => {
        this.mapPoints(points);
      });
  }

  mapPoints(points: ServicePointInterface[]): void {
    this.points = points;
    this.points.forEach((p) => (p['selectedOnMap'] = false));
    const pointId = JSON.parse(sessionStorage.getItem('rzd-order'))?.id_point;
    this.selectedPoint = this.points.find((p) => p.id === pointId);
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

  clearOrderServices(): void {
    this.servicesRegistration.order.items.forEach((item) => {
      item.services = [];
    });
    this.servicesRegistration.order.sum = 0;
  }

  selectMapPoint(event, point: ServicePointInterface): void {
    this.selectedPlacemark = this.uniqueGeoObjects.find(
      (o) =>
        o.geometry._coordinates[0] === event.target.geometry._coordinates[0]
    );

    this.uniqueGeoObjects.forEach((o) => {
      o.options.set('iconImageHref', 'assets/gps-red.svg');
    });
    this.selectedPlacemark.options.set('iconImageHref', 'assets/gps-blue.svg');
    this.selectedPoint = point;
  }

  ready(event, point: ServicePointInterface): void {
    this.mapGeoObjects(event);

    if (
      JSON.stringify(this.selectedPoint) === JSON.stringify(point) &&
      this.selectedPoint
    ) {
      this.selectedPlacemark = event.target;
      this.selectedPlacemark.options.set(
        'iconImageHref',
        'assets/gps-blue.svg'
      );
    }
  }

  mapGeoObjects(event): void {
    this.geoObjects.push(event.target);
    this.uniqueGeoObjects = this.geoObjects.filter(
      (thing, index, self) =>
        index ===
        self.findIndex(
          (t) => t.geometry._coordinates[0] === thing.geometry._coordinates[0]
        )
    );
  }

  changeToList(): void {
    this.addressMode = 'list';
    this.geoObjects = [];
    this.uniqueGeoObjects = [];
  }

  closeMapCard(): void {
    this.selectedPoint = null;
    this.selectedPlacemark.options.set('iconImageHref', 'assets/gps-red.svg');
    this.selectedPlacemark = null;
  }
}
