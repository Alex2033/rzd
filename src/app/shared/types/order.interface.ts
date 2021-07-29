import { QuestionnaireOrderInterface } from './questionnaire-order.interface';

export interface OrderInterface {
  id: number;
  id_point: number;
  status: string;
  sum: number; // итоговая сумма без учета скидок
  total: number; // итоговая сумма с учетом скидок
  utm_discount_value: number; // величина скидки
  utm_discount_type: number; // тип скидки
  payment: string;
  already_paid: boolean;
  been_abroad: boolean;
  abroad_return_date: string;
  dt_creation: string;
  dt_last_edit: string;
  qr_send: boolean;

  items: QuestionnaireOrderInterface[];
}
