import { OrderServiceInterface } from 'src/app/shared/types/order-service.interface';

export interface AnketaIdInterface {
  id_anketa: number;
  services: OrderServiceInterface[];
}
