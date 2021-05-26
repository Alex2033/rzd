import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';

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

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe((res) => {
      console.log('res:', res);
      this.orders = res;
    });
  }
}
