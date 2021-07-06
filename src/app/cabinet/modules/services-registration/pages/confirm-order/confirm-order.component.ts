import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
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

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private points: ServicePointsService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.ordersService.getOrders(),
      this.servicesService.getServices(),
    ])
      .pipe(
        tap(([params, orders, services]) => {
          this.order = orders.find((o) => o.id === +params.id);
          this.order.items.forEach((item: any) => {
            item.services = item.services.map((service: any) => {
              return (service = services.find(
                (s) => s.id === service.id_service
              ));
            });
          });
        }),
        switchMap(() => this.points.getServicePoint(this.order.id_point))
      )
      .subscribe(
        (point) => {
          this.point = point;
        },
        (err) => console.error(err)
      );
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
