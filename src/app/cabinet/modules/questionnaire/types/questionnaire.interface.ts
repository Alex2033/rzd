export interface QuestionnaireInterface {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  age: number;
  draft: boolean;
  is_corp_client: boolean;
  children: QuestionnaireInterface[];
}
