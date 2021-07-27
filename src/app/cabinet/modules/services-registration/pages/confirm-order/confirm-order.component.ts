import { SettingsInterface } from 'src/app/shared/types/settings.interface';
import { SettingsService } from './../../../../../shared/services/settings.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest, ReplaySubject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { ServicesService } from 'src/app/shared/services/services.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit, OnDestroy {
  public order: OrderInterface;
  public orderId: number;
  public point: ServicePointInterface;
  public discount: number;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private points: ServicePointsService,
    private servicesService: ServicesService,
    private location: Location,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.ordersService.getOrders(),
      this.servicesService.getServices(),
      this.settings.getSettings(),
    ])
      .pipe(
        tap(([params, orders, services, settings]) => {
          this.order = orders.find((o) => o.id === +params.id);
          this.applyDiscount(settings);
          this.order.items.forEach((item: any) => {
            item.services = item.services.map((service: any) => {
              return (service = services.find(
                (s) => s.id === service.id_service
              ));
            });
          });
        }),
        switchMap(() => this.points.getServicePoint(this.order.id_point)),
        takeUntil(this.destroy)
      )
      .subscribe(
        (point) => {
          this.point = point;
        },
        (err) => console.error(err)
      );
  }

  applyDiscount(settings: SettingsInterface): void {
    const utmDiscount = settings.utm_discounts.find(
      (d) => d.utm_source === this.settings.utmMark
    );

    if (utmDiscount) {
      const start = new Date(utmDiscount.dt_start);
      const stop = new Date(utmDiscount.dt_stop);

      const expired = start.getTime() >= stop.getTime();

      if (utmDiscount.enabled && !expired) {
        if (utmDiscount.type === 'percent') {
          this.discount = (this.order.sum * utmDiscount.value) / 100;
          this.order.sum = this.order.sum - this.discount;
        }

        if (utmDiscount.type === 'rub') {
          this.discount = utmDiscount.value;
          this.order.sum = this.order.sum - this.discount;
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  back(): void {
    this.location.back();
  }
}
