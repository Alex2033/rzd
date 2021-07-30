import { CorporateClientsService } from 'src/app/shared/services/corporate-clients.service';
import { SettingsService } from './../../../../../shared/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { PaymentInterface } from 'src/app/shared/types/payment.interface';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SettingsInterface } from 'src/app/shared/types/settings.interface';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  public selectedPayment: string;
  public isLoading: boolean = false;
  public order: OrderInterface;
  public settings: SettingsInterface = {} as SettingsInterface;
  public utmMark: string = '';
  public corpPaymentEnable: boolean = false;
  public corpErrorText: string;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private location: Location,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private language: LanguageService,
    private settingsService: SettingsService,
    private corporateClients: CorporateClientsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => this.ordersService.getOrder(+params.id)),
        switchMap((order) => {
          if (order) {
            this.order = order;
            this.selectedPayment = order.payment;
          }

          return this.corporateClients.corpCheck(order.id);
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            this.setErrors(err.error.error);
          }
          return of(undefined);
        }),
        switchMap((res) => {
          this.corpPaymentEnable = res;
          return this.settingsService.getSettings();
        })
      )
      .subscribe((settings) => {
        this.settings = settings;
        this.applyDiscount(settings);
      });
  }

  setErrors(err: string): void {
    switch (err) {
      case 'LIMIT_EXCEEDED':
        this.corpErrorText = 'Лимит исчерпан.';
        break;

      case 'OUTSIDERS_FOUND':
        this.corpErrorText = 'В заказе несколько анкет.';
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  applyDiscount(settings: SettingsInterface): void {
    const utmDiscount = settings.utm_discounts.find(
      (d) => d.utm_source === this.settingsService.utmMark
    );

    if (utmDiscount) {
      const start: Date = new Date(utmDiscount.dt_start);
      const stop: Date = new Date(utmDiscount.dt_stop);

      const isPointAvailable: boolean = utmDiscount.points.some(
        (p) => p === this.order.id_point
      );
      const expired: boolean = start.getTime() >= stop.getTime();

      if (utmDiscount.enabled && !expired && isPointAvailable) {
        this.utmMark = this.settingsService.utmMark;
      }
    }
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
      utm: this.utmMark,
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
            if (err.error.error === 'ANKETA_QR_EMPTY_FIELDS') {
              this.router.navigate(
                ['/cabinet', 'services-registration', 'empty-questionnaires'],
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
