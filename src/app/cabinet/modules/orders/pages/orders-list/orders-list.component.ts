import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  public orders: OrderInterface[] = [];
  public types: object[] = [
    {
      label: 'Все',
      value: 'all',
    },
    {
      label: 'Оформлен',
      value: '',
    },
  ];

  constructor(
    private ordersService: OrdersService,
    private points: ServicePointsService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.points.getServicePoints(),
      this.ordersService.getOrders(),
    ]).subscribe(
      ([points, orders]) => {
        this.orders = orders;
        this.addAddressToOrder(points);
      },
      (err) => console.error(err)
    );
  }

  addAddressToOrder(points: ServicePointInterface[]): void {
    this.orders.forEach((order) => {
      order['shortAddress'] = points.find(
        (point) => point.id === order.id_point
      )['name'];
    });
  }
}
