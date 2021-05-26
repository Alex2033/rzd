import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ReplaySubject } from 'rxjs';
import { PaymentInterface } from 'src/app/shared/types/payment.interface';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  public selectedPayment: string;
  public isLoading: boolean = false;
  public order: OrderInterface;
  public resend: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private location: Location,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router
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
    };

    if (this.resend) {
      this.ordersService
        .rePay(this.order.id)
        .pipe(
          finalize(() => (this.isLoading = false)),
          takeUntil(this.destroy)
        )
        .subscribe(
          () => {},
          (err) => {
            this.resend = false;
            this.handleError(err);
          }
        );
    } else {
      this.ordersService
        .pay(payment)
        .pipe(
          finalize(() => (this.isLoading = false)),
          takeUntil(this.destroy)
        )
        .subscribe(
          () => {
            this.successPayment();
          },
          (err) => {
            this.handleError(err);
          }
        );
    }
  }

  successPayment(): void {
    if (this.selectedPayment === 'TERMINAL') {
      this.router.navigate(
        [
          '/cabinet',
          'services-registration',
          'payment-response',
          this.order.id,
        ],
        {
          queryParams: {
            text: 'terminal',
          },
        }
      );
    } else if (this.selectedPayment === 'ADMIN') {
      this.router.navigate(
        [
          '/cabinet',
          'services-registration',
          'payment-response',
          this.order.id,
        ],
        {
          queryParams: {
            text: 'admin',
          },
        }
      );
    }
  }

  handleError(err: HttpErrorResponse): void {
    if (err instanceof HttpErrorResponse) {
      if (err.error.error === 'MEDME_SEND_ERROR') {
        this.resend = true;
        alert('Ошибка');
      } else {
        this.router.navigate(
          [
            '/cabinet',
            'services-registration',
            'payment-response',
            this.order.id,
          ],
          {
            queryParams: {
              text: 'error',
            },
          }
        );
      }
    }
  }
}
