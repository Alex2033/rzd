import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';

@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.scss'],
})
export class PaymentResponseComponent implements OnInit {
  public text: string;
  public order: OrderInterface;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    this.route.params
      .pipe(
        switchMap((params) => this.ordersService.getOrder(+params.id)),
        switchMap((res) => {
          this.order = res;
          return this.route.queryParams;
        })
      )
      .pipe(takeUntil(this.destroy))
      .subscribe((params) => {
        this.setContent(params.text);
      });
  }

  setContent(text: string): void {
    switch (text) {
      case 'online':
        this.text = `Ваш заказ №${this.order.id} успешно оплачен.`;
        break;
      case 'TERMINAL':
        this.text = `Ваш заказ №${this.order.id} оформлен. Вы можете оплатить его в инфокиоске.`;
        break;
      case 'ADMIN':
        this.text = `Ваш заказ №${this.order.id} оформлен. Вы можете оплатить его у администратора.`;
        break;
      default:
        break;
    }
  }
}
