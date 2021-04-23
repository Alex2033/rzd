import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrdersService } from '../../services/orders.service';
import { OrderInterface } from '../../types/order.interface';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  public order$: Observable<OrderInterface>;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.order$ = this.route.params.pipe(
      switchMap((params: Params) => this.ordersService.getOrder(+params.id))
    );
  }
}
