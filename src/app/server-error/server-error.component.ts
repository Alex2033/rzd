import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit, OnDestroy {
  public text: string;
  public link: string;
  public closeLink: string;
  public buttonText: string;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.queryParams, this.route.params])
      .pipe(takeUntil(this.destroy))
      .subscribe(([queryParams, params]) => {
        this.setError(params.key, queryParams.orderId);
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  setError(key: string, orderId: string): void {
    switch (key) {
      case 'ORDER_PARSE_ERROR':
        this.text = this.translate.instant('ERROR_CREATING_ORDER');
        this.buttonText = this.translate.instant('TRY_AGAIN');
        break;

      case 'PAYMENT_UNKNOWN':
        this.text = this.translate.instant('FAILED_PAY_TRY_AGAIN');
        this.buttonText = this.translate.instant('TRY_AGAIN');
        this.link = `/cabinet/services-registration/payment-method/${orderId}`;
        break;

      case 'ORDER_NOT_FOUND':
        this.closeLink = '/cabinet/orders';
        this.text = this.translate.instant('ORDER_NOT_FOUND');
        this.buttonText = this.translate.instant('TO_ORDERS');
        this.link = '/cabinet/orders';
        break;

      case 'POINT_NOT_FOUND':
        this.text = this.translate.instant('SELECTED_SERVICE_NOT_AVAILABLE');
        this.buttonText = this.translate.instant('SELECT_SERVICE_POINT');
        this.link = '/cabinet/services-registration/select-point/0';
        break;

      case 'INVALID_RETURN_DATE':
        this.text = this.translate.instant('INVALID_FORMAT_DATE_RETURN');
        this.buttonText = this.translate.instant('SPECIFY_DATE');
        this.link = '/cabinet/services-registration/questions/0';
        break;

      case 'ANKETA_NOT_FOUND':
        this.text = this.translate.instant('SELECTED_PROFILE_NOT_FOUND');
        this.buttonText = this.translate.instant('SELECT_PROFILE');
        this.link = '/cabinet/questionnaires';
        break;

      case 'ANKETA_PARSE_ERROR':
        this.text = this.translate.instant('CHOSEN_PROFILE_NOT_COMPLETED');
        this.buttonText = this.translate.instant('GO_TO_PROFILES');
        this.link = '/cabinet/questionnaires';
        this.closeLink = '/cabinet/questionnaires';
        break;

      case 'ANKETA_BAD_STATUS':
        this.text = this.translate.instant('CHOSEN_PROFILE_NOT_FULLY');
        this.buttonText = this.translate.instant('GO_TO_PROFILE');
        break;

      case 'SERVICES_NOT_SELECTED':
        this.text = this.translate.instant(
          'FAILED_ORDER_SERVICES_NOT_SELECTED'
        );
        this.buttonText = this.translate.instant('GO_TO_SERVICE_SELECTION');
        break;

      case 'SERVICE_NOT_FOUND':
        this.text = this.translate.instant('SELECTED_SERVICE_NOT_SELECTED');
        this.buttonText = this.translate.instant('GO_TO_SERVICE_SELECTION');
        break;

      case 'PRICE_NOT_FOUND':
        this.text = this.translate.instant('UNABLE_FIND_PRICE');
        this.buttonText = this.translate.instant('TRY_AGAIN');
        break;

      case 'ANKETA_NOT_FOUND':
        this.text = this.translate.instant('SELECTED_PROFILE_NOT_FOUND');
        this.buttonText = this.translate.instant('GO_TO_PROFILES');
        break;

      case 'DOC_CONTENT_NOT_FOUND':
        this.text = this.translate.instant('document_listed_incorrectly');
        this.buttonText = this.translate.instant('GO_TO_PROFILE');
        break;

      case 'FIO_LANG_MISMATCH':
        this.text = this.translate.instant('FIO_NOT_CORRESPOND');
        this.buttonText = this.translate.instant('GO_TO_PROFILE');
        break;

      case 'FIELD_NOT_FOUND':
        this.text = this.translate.instant('FIELD_FILLED_INCOMPLETELY');
        this.buttonText = this.translate.instant('GO_TO_PROFILE');
        break;

      case 'FIELD_BAD_VALUE':
        this.text = this.translate.instant('INCORRET_FIELD_VALUE');
        this.buttonText = this.translate.instant('GO_TO_PROFILE');
        break;

      case 'FIELD_BAD_FORMAT':
        this.text = this.translate.instant('INVALID_PROFILE_FIELD_FORMAT');
        this.buttonText = this.translate.instant('TRY_AGAIN');
        break;

      case 'REQUIRED_FIELD_EMPTY':
        this.text = this.translate.instant('REQUIRED_FIELDS_INCOMPLETE');
        this.buttonText = this.translate.instant('GO_TO_PROFILE');
        break;

      case 'SMS_ERROR':
        this.closeLink = '/';
        this.text = this.translate.instant('SERVER_CONNECTION_ERROR');
        this.buttonText = this.translate.instant('TRY_AGAIN');
        break;

      case 'PAYMENT_ERROR':
        this.closeLink = '/cabinet/orders';
        this.text = this.translate.instant('PAYMENT_ERROR') + '...';
        this.buttonText = this.translate.instant('TRY_AGAIN');
        this.link = orderId
          ? `/cabinet/services-registration/payment-method/${orderId}`
          : '/cabinet/orders';
        break;

      case 'LIMIT_EXCEEDED':
        this.closeLink = '/cabinet/questionnaires';
        this.text = this.translate.instant('LIMIT_ON_PAYMENT');
        this.buttonText = this.translate.instant('PROFILES');
        this.link = '/cabinet/questionnaires';
        break;

      default:
        this.text = this.translate.instant('SERVER_CONNECTION_ERROR');
        this.buttonText = this.translate.instant('TRY_AGAIN');
        break;
    }
  }

  close(): void {
    if (this.closeLink) {
      this.router.navigate([this.closeLink]);
    } else {
      this.location.back();
    }
  }

  navigate(): void {
    if (this.link) {
      this.router.navigate([this.link]);
    } else {
      this.location.back();
    }
  }
}
