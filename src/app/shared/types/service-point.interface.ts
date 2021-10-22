export interface ServicePointInterface {
  id: number;
  extId: string;
  name: string;
  address: string;
  location: string;
  worktime: string;
  contacts: string;
  latitude: number;
  longtitude: number;
  enableOnlinePayment: boolean;
  enableCorpPayment: boolean;
  enableAdminPayment: boolean;
  enableOrderCreation: boolean;
  enableTerminalPayment: boolean;
  webNavigation?: string;
}
