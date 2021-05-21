import { OrderServiceInterface } from './order-service.interface';

export interface QuestionnaireOrderInterface {
  id_anketa: number;
  fio?: string;
  signed?: boolean;
  ext_id?: number;
  services?: OrderServiceInterface[];
}
