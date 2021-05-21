import { QuestionnaireOrderInterface } from './questionnaire-order.interface';

export interface OrderInterface {
  id?: number;
  id_point?: number;
  status?: string;
  sum?: number;
  payment?: string;
  already_paid?: boolean;
  been_abroad?: boolean;
  abroad_return_date?: string;
  dt_creation?: string;
  dt_last_edit?: string;
  items: QuestionnaireOrderInterface[];
}
