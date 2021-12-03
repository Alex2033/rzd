import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
    private ordersService: OrdersService,
    private translate: TranslateService
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
      case 'CORPORATE':
        this.text = this.translate.instant('ORDER_COMPLETED_ONLINE');
        break;
      case 'TERMINAL':
        this.text = this.translate.instant('ORDER_COMPLETED_KIOSKS');
        break;
      case 'ADMIN':
        this.text = this.translate.instant('ORDER_COMPLETED_ADMIN');
        break;

      default:
        break;
    }
  }
}
