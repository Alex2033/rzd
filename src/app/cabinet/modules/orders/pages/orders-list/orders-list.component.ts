import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';
import { OrderInterface } from '../../types/order.interface';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  public orders$: Observable<OrderInterface[]>;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.getOrders().pipe(share());
  }
}
