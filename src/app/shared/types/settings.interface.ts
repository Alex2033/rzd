export interface SettingsInterface {
  enableOnlinePayment: boolean;
  enableCorpPayment: boolean;
  enableOrderCreation: boolean;
  utm_discounts: UtmDiscountsInterface[];
}

interface UtmDiscountsInterface {
  id: string;
  utm_source: string;
  value: string;
  type: string;
  dt_start: string;
  dt_stop: string;
  enabled: boolean;
}
