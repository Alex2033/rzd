import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { combineLatest, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    private location: Location
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.queryParams, this.route.params])
      .pipe(takeUntil(this.destroy))
      .subscribe(([queryParams, params]) => {
        this.setError(params.key, queryParams.orderId);
      });
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

  setError(key: string, orderId: string): void {
    switch (key) {
      case 'ORDER_PARSE_ERROR':
        this.text = 'Произошла ошибка при создании заказа...';
        this.buttonText = 'Попробовать снова';
        break;

      case 'PAYMENT_UNKNOWN':
        this.text =
          'Не удалось оплатить заказ. Попробуйте еще раз или выберите другой способ оплаты.';
        this.buttonText = 'Попробовать снова';
        this.link = `/cabinet/services-registration/payment-method/${orderId}`;
        break;

      case 'POINT_NOT_FOUND':
        this.text =
          'Выбранная точка обслуживания недоступна. Пожалуйста, выберите другую точку обслуживания.';
        this.buttonText = 'Выбрать точку обслуживания';
        this.link = '/cabinet/select-point/0';
        break;

      case 'INVALID_RETURN_DATE':
        this.text =
          'Неверный формат даты возвращения в РФ. Пожалуйста укажите верную дату.';
        this.buttonText = 'Указать дату';
        this.link = '/cabinet/questions/0';
        break;

      case 'ANKETA_NOT_FOUND':
        this.text =
          'Выбранная вами анкета не найдена. Пожалуйста выберите другую анкету или попробуйте еще раз.';
        this.buttonText = 'Выбрать анкету';
        this.link = '/cabinet/questionnaires';
        break;

      case 'ANKETA_PARSE_ERROR':
        this.text =
          'Выбранная вами анкета не заполнена или заполнена не полностью. Пожалуйста проверьте правильность заполнения полей.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'ANKETA_BAD_STATUS':
        this.text =
          'Выбранная вами анкета заполнена не полностью. Пожалуйста заполните все обязательные поля.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'SERVICES_NOT_SELECTED':
        this.text =
          'Не удалось оформить заказ, так как не выбраны услуги. Пожалуйста выберите услуги и продолжите оформление заказа.';
        this.buttonText = 'Перейти к выбору услуг';
        break;

      case 'SERVICE_NOT_FOUND':
        this.text =
          'Выбранная услуга не доступна для выбранной точки обслуживания. Пожалуйста выберите другую услугу или смените точку обслуживания.';
        this.buttonText = 'Перейти к выбору услуг';
        break;

      case 'PRICE_NOT_FOUND':
        this.text =
          'Не удалось узнать цену выбранной услуги. Пожалуйста попробуйте снова.';
        this.buttonText = 'Попробовать снова';
        break;

      case 'ANKETA_NOT_FOUND':
        this.text =
          'Выбранная вами анкета не найдена. Пожалуйста выберите другую анкету или попробуйте снова.';
        this.buttonText = 'Перейти к анкетам';
        break;

      case 'DOC_CONTENT_NOT_FOUND':
        this.text =
          'Документ указан не верно. Пожалуйста выберите документ из списка.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'FIO_LANG_MISMATCH':
        this.text =
          'Данные ФИО не соответствуют документу. Пожалуйста введите верные данные.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'FIELD_NOT_FOUND':
        this.text =
          'Поле заполнено не полностью или неверно. Пожалуйста повторите попытку.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'FIELD_BAD_VALUE':
        this.text =
          'Неккоректное значение поля. Пожалуйста, заполните поле по формату.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'FIELD_BAD_FORMAT':
        this.text =
          'Неверный формат поля анкеты. Пожалуйста проверьте корректность веденных данных';
        this.buttonText = 'Попробовать снова';
        break;

      case 'REQUIRED_FIELD_EMPTY':
        this.text =
          'Обязательные поля заполнены не полностью. Пожалуйста заполните все обязательные поля.';
        this.buttonText = 'Перейти к анкете';
        break;

      case 'SMS_ERROR':
        this.closeLink = '/';
        this.text = 'Ошибка соединения с сервером...';
        this.buttonText = 'Попробовать снова';
        break;

      case 'PAYMENT_ERROR':
        this.closeLink = '/cabinet/orders';
        this.text = 'Ошибка оплаты...';
        this.buttonText = 'Попробовать снова';
        this.link = orderId
          ? `/cabinet/services-registration/payment-method/${orderId}`
          : '/cabinet/orders';
        break;

      default:
        this.text = 'Ошибка соединения с сервером...';
        this.buttonText = 'Попробовать снова';
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
