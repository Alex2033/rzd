export interface QuestionnaireDetailInterface {
  id?: number;
  ext_id?: string;
  id_parent: number;
  age?: number;
  draft?: boolean;
  content?: QuestionnaireContentInterface;
}

interface QuestionnaireContentInterface {
  name?: string;
  name_lat?: string;
  surname?: string;
  surname_lat?: string;
  patronymic?: string;
  birthday?: string;
  email?: string;
  phone?: string;
  sex?: string;
  citizenship?: string;
  passport_number?: string;
  passport_org?: string;
  passport_date?: string;
  company?: string;
  position?: string;
  adress_single?: string;
  adress_reg_country?: string;
  adress_reg_region?: string;
  adress_reg_area?: string;
  adress_reg_city?: string;
  adress_reg_location?: string;
  adress_reg_street?: string;
  adress_reg_building?: string;
  adress_reg_flat?: string;
  adress_fact_country?: string;
  adress_fact_region?: string;
  adress_fact_area?: string;
  adress_fact_city?: string;
  adress_fact_location?: string;
  adress_fact_street?: string;
  adress_fact_building?: string;
  adress_fact_flat?: string;
}
