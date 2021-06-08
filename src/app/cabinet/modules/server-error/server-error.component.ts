import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  public text: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.setError(params.key);
    });
  }

  setError(key: string): void {
    switch (key) {
      case 'ORDER_PARSE_ERROR':
        this.text = 'Произошла ошибка при создании заказа...';
        break;

      case 'PAYMENT_UNKNOWN':
        this.text =
          'Не удалось оплатить заказ. Попробуйте еще раз или выберите другой способ оплаты.';
        break;

      case 'POINT_NOT_FOUND':
        this.text =
          'Выбранная точка обслуживания недоступна. Пожалуйста, выберите другую точку обслуживания.';
        break;

      case 'INVALID_RETURN_DATE':
        this.text =
          'Неверный формат даты возвращения в РФ. Пожалуйста укажите верную дату.';
        break;

      case 'ANKETA_NOT_FOUND':
        this.text =
          'Выбранная вами анкета не найдена. Пожалуйста выберите другую анкету или попробуйте еще раз.';
        break;

      case 'ANKETA_PARSE_ERROR':
        this.text =
          'Выбранная вами анкета не заполнена или заполнена не полностью. Пожалуйста проверьте правильность заполнения полей.';
        break;

      case 'ANKETA_BAD_STATUS':
        this.text =
          'Выбранная вами анкета заполнена не полностью. Пожалуйста заполните все обязательные поля.';
        break;

      case 'SERVICES_NOT_SELECTED':
        this.text =
          'Не удалось оформить заказ, так как не выбраны услуги. Пожалуйста выберите услуги и продолжите оформление заказа.';
        break;

      case 'SERVICE_NOT_FOUND':
        this.text =
          'Выбранная услуга не доступна для выбранной точки обслуживания. Пожалуйста выберите другую услугу или смените точку обслуживания.';
        break;

      case 'PRICE_NOT_FOUND':
        this.text =
          'Не удалось узнать цену выбранной услуги. Пожалуйста попробуйте снова.';
        break;

      case 'ANKETA_NOT_FOUND':
        this.text =
          'Выбранная вами анкета не найдена. Пожалуйста выберите другую анкету или попробуйте снова.';
        break;

      case 'ANKETA_NOT_FOUND':
        this.text =
          'Выбранная вами анкета не найдена. Пожалуйста выберите другую анкету или попробуйте снова.';
        break;

      case 'DOC_CONTENT_NOT_FOUND':
        this.text =
          'Документ указан не верно. Пожалуйста выберите документ из списка.';
        break;

      case 'FIO_LANG_MISMATCH':
        this.text =
          'Данные ФИО не соответствуют документу. Пожалуйста введите верные данные.';
        break;

      case 'FIELD_NOT_FOUND':
        this.text =
          'Поле заполнено не полностью или неверно. Пожалуйста повторите попытку.';
        break;

      case 'FIELD_BAD_VALUE':
        this.text =
          'Неккоректное значение поля. Пожалуйста, заполните поле по формату.';
        break;

      case 'FIELD_BAD_FORMAT':
        this.text =
          'Неверный формат поля анкеты. Пожалуйста проверьте корректность веденных данных';
        break;

      case 'REQUIRED_FIELD_EMPTY':
        this.text =
          'Обязательные поля заполнены не полностью. Пожалуйста заполните все обязательные поля.';
        break;

      default:
        break;
    }
  }
}
