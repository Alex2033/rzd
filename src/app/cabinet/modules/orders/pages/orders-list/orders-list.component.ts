import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ServicePointsService } from 'src/app/shared/services/service-points.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ServicePointInterface } from 'src/app/shared/types/service-point.interface';
import { OrderTypeInterface } from '../../types/order-type.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  public orders: OrderInterface[] = [];
  public filteredOrders: OrderInterface[] = [];
  public types: OrderTypeInterface[] = [
    {
      label: 'Все',
      value: 'ALL',
    },
    {
      label: 'Черновик',
      value: 'CREATED',
    },
    {
      label: 'Подтвержден',
      value: 'CONFIRMED',
    },
    {
      label: 'Оформлен',
      value: 'READY',
    },
    {
      label: 'Ожидает оплаты',
      value: 'UNPAID',
    },
  ];

  public selectedFilter: string;
  public isLoading: boolean = false;

  constructor(
    private ordersService: OrdersService,
    private points: ServicePointsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    combineLatest([
      this.points.getServicePoints(),
      this.ordersService.getOrders(),
    ]).subscribe(
      ([points, orders]) => {
        this.orders = orders;
        this.filteredOrders = this.orders;
        this.addAddressToOrder(points);
        this.selectedFilter =
          sessionStorage.getItem('rzd-orders-sort') || this.types[0].value;
        this.sortOrder(this.selectedFilter);
        this.isLoading = false;
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.router.navigate(['/server-error', err.error.error]);
        }
      }
    );
  }

  addAddressToOrder(points: ServicePointInterface[]): void {
    this.orders.forEach((order) => {
      order['shortAddress'] = points.find(
        (point) => point.id === order.id_point
      )['name'];
    });
  }

  filterChange(event: MatSelectChange): void {
    sessionStorage.setItem('rzd-orders-sort', event.value);
    this.sortOrder(event.value);
  }

  sortOrder(value: string): void {
    if (value === 'ALL') {
      this.filteredOrders = this.orders;
      return;
    }
    this.filteredOrders = this.orders.filter((order) => order.status === value);
  }
}
