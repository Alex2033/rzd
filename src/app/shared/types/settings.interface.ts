import { UtmDiscountsInterface } from './utm-discounts.interface';

export interface SettingsInterface {
  enableOnlinePayment: boolean;
  enableCorpPayment: boolean;
  enableOrderCreation: boolean;
  utm_discounts: UtmDiscountsInterface[];
}
