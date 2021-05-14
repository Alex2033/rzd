export interface QuestionnaireInterface {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  age: number;
  draft: boolean;
  children: QuestionnaireInterface[];
}
