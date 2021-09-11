import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderInterface } from './../../../../../shared/types/order.interface';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-refund',
  templateUrl: './order-refund.component.html',
  styleUrls: ['./order-refund.component.scss'],
})
export class OrderRefundComponent implements OnInit {
  public orderId$: Observable<OrderInterface>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId$ = this.route.params.pipe(map((params) => params.id));
  }
}
