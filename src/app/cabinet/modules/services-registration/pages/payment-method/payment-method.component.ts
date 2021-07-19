import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ReplaySubject } from 'rxjs';
import { PaymentInterface } from 'src/app/shared/types/payment.interface';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  public selectedPayment: string;
  public isLoading: boolean = false;
  public order: OrderInterface;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private location: Location,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private language: LanguageService
  ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(): void {
    this.route.params
      .pipe(switchMap((params) => this.ordersService.getOrder(+params.id)))
      .subscribe((res) => {
        if (res) {
          this.order = res;
          this.selectedPayment = res.payment;
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  back(): void {
    this.location.back();
  }

  pay(): void {
    this.isLoading = true;

    const payment: PaymentInterface = {
      id_order: this.order.id,
      payment: this.selectedPayment,
      autoStatus: true,
      id_lang: this.language.langId.value,
    };

    this.ordersService
      .pay(payment)
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (res) => {
          if (res.payment_page) {
            window.location.href = res.payment_page;
          } else {
            this.successPayment();
          }
          this.isLoading = false;
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.error.error === 'ANKETA_OMS_EMPTY') {
              this.router.navigate(
                [
                  '/cabinet',
                  'services-registration',
                  'empty-oms-questionnaires',
                ],
                {
                  queryParams: {
                    value: err.error.value,
                  },
                }
              );
              return;
            }

            this.router.navigate(['/server-error', err.error.error], {
              queryParams: {
                orderId: this.order.id,
              },
            });
          }
        }
      );
  }

  successPayment(): void {
    this.router.navigate(
      ['/cabinet', 'services-registration', 'payment-response', this.order.id],
      {
        queryParams: {
          text: this.selectedPayment,
        },
      }
    );
  }
}
