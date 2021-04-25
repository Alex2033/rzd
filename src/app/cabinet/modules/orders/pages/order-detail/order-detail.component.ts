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
  public order: OrderInterface = {} as OrderInterface;
  public totalPrice: number = 0;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.ordersService.getOrder(+params.id))
      )
      .subscribe((order) => {
        this.order = order;
        this.totalPrice = this.calcTotalPrice();
      });
  }

  calcTotalPrice(): number {
    return this.order.services.reduce((prev, cur) => prev + cur['price'], 0);
  }
}
