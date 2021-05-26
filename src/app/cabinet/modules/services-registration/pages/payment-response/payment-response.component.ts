import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { OrderInterface } from 'src/app/shared/types/order.interface';

@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.scss'],
})
export class PaymentResponseComponent implements OnInit {
  public isError: boolean = false;
  public text: string;
  public order: OrderInterface;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {});
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
      .subscribe((params) => {
        this.setContent(params.text);
      });
  }

  setContent(text: string): void {
    switch (text) {
      case 'error':
        this.isError = true;
        this.text =
          'Не удалось оплатить заказ. Попробуйте еще раз или выберите другой способ оплаты.';
        break;
      case 'terminal':
        this.text = `Ваш заказ №${this.order.id} оформлен. Вы можете оплатить его в инфоиоске.`;
        break;
      case 'admin':
        this.text = `Ваш заказ №${this.order.id} оформлен. Вы можете оплатить его у администратора.`;
        break;
      default:
        break;
    }
  }

  navigate(): void {
    if (this.isError) {
      this.router.navigate([
        '/cabinet',
        'services-registration',
        'payment-method',
        this.order.id,
      ]);
    } else {
      this.router.navigate(['/cabinet', 'orders']);
    }
  }
}
