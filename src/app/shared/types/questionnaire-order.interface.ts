export interface QuestionnaireOrderInterface {
  id_anketa: number;
  fio: string;
  signed?: boolean;
  ext_id?: number;
  services: number[];
  is_corp_client: boolean;
}
