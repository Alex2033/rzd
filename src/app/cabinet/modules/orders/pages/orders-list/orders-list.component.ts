import { takeUntil, switchMap, finalize, takeWhile } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { combineLatest, ReplaySubject, timer } from 'rxjs';
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
      label: 'Не подтвержден',
      value: 'READY',
    },
    {
      label: 'Ожидает оплаты',
      value: 'UNPAID',
    },
    {
      label: 'Ошибка оплаты',
      value: 'UNPAID_REFUSED',
    },
    {
      label: 'Частично подтвержден',
      value: 'READY_PART_CONFIRMED',
    },
  ];

  public selectedFilter: string;
  public isLoading: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

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
        this.filteredOrders.forEach((o, index) => {
          if (o.status === 'UNPAID_REGISTERED') {
            let result;
            o.status = 'UNPAID_PROCESSING';
            timer(0, 5000)
              .pipe(
                takeWhile((val) => val < 5 && o.status === 'UNPAID_PROCESSING'),
                switchMap(() => this.ordersService.checkPayStatus(o.id)),
                finalize(() => {
                  if (
                    o.status === 'UNPAID_REGISTERED' ||
                    o.status === 'UNPAID_PROCESSING'
                  ) {
                    o.status = 'UNPAID_ERROR';
                  }
                }),
                takeUntil(this.destroy)
              )
              .subscribe((res) => {
                result = res;
                if (res.status !== 'UNPAID_REGISTERED') {
                  this.filteredOrders[index].status = res.status;
                  this.filteredOrders[index].items = res.items;
                }
              });
          }

          if (o.status === 'READY' || o.status === 'READY_PART_CONFIRMED') {
            let result;
            o.status = 'READY_PROCESSING';
            timer(0, 5000)
              .pipe(
                takeWhile(
                  (val) =>
                    val < 5 &&
                    o.status !== 'READY' &&
                    o.status !== 'READY_PART_CONFIRMED'
                ),
                switchMap(() => this.ordersService.checkMedmeStatus(o.id)),
                finalize(() => {
                  o.status = result.status;
                }),
                takeUntil(this.destroy)
              )
              .subscribe((res) => {
                result = res;
                if (
                  res.status !== 'READY' &&
                  res.status !== 'READY_PART_CONFIRMED'
                ) {
                  this.filteredOrders[index] = { ...res };
                }
              });
          }
        });
      },
      (err) => {
        if (err instanceof HttpErrorResponse) {
          this.router.navigate(['/server-error', err.error.error]);
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  addAddressToOrder(points: ServicePointInterface[]): void {
    this.orders.forEach((order) => {
      order['shortAddress'] = points.find(
        (point) => point.id === order.id_point
      )?.name;
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

  orderClick(id: number, status: string): void {
    switch (status) {
      case 'CREATED':
        this.router.navigate(
          ['/cabinet', 'services-registration', 'document', id],
          {
            queryParams: {
              questionnaireNum: 1,
              docIndex: 1,
            },
          }
        );
        break;
      case 'SIGNED':
        this.router.navigate([
          '/cabinet',
          'services-registration',
          'confirm',
          id,
        ]);
        break;
      case 'UNPAID':
      case 'UNPAID_REFUSED':
        this.router.navigate([
          '/cabinet',
          'services-registration',
          'payment-method',
          id,
        ]);
        break;

      default:
        this.router.navigate(['/cabinet', 'orders', id]);
        break;
    }
  }
}
