import { UtmDiscountsInterface } from './utm-discounts.interface';

export interface SettingsInterface {
  enableOnlinePayment: boolean;
  enableCorpPayment: boolean;
  enableAdminPayment: boolean;
  enableOrderCreation: boolean;
  enableTerminalPayment: boolean;
  utm_discounts: UtmDiscountsInterface[];
}
