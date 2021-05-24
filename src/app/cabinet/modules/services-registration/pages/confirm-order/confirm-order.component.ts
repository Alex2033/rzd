import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  public order: OrderInterface = {} as OrderInterface;
  public orderId: number;
  public point$: Observable<ServicePointInterface>;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private points: ServicePointsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.orderId = +res.id;
    });
    this.ordersService.getOrders().subscribe((res) => {
      this.order = res.find((o) => o.id === this.orderId);
      this.point$ = this.points.getServicePoint(this.order.id_point);
    });
  }
}
