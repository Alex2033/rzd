import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './../../../../../shared/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ReplaySubject } from 'rxjs';
import { PaymentInterface } from 'src/app/shared/types/payment.interface';
import { OrderInterface } from 'src/app/shared/types/order.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
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
  public isCorporatePayment: boolean = false;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private location: Location,
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private settingsService: SettingsService,
    private translate: TranslateService
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

          if (order.payment === 'CORPORATE') {
            this.isCorporatePayment = true;
          }

          return this.settingsService.getSettings(this.order.id_point);
        })
      )
      .subscribe((settings) => {
        this.settings = settings;
        this.applyDiscount(settings);
      });
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
      id_lang: this.translate.currentLang,
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
