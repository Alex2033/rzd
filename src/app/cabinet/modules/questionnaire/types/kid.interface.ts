import { QuestionnaireDocumentInterface } from './questionnaire-document.interface';

export interface KidInterface {
  id: number;
  name: string;
  age: string;
  surname: string;
  patronymic: string;
  date: string;
  checked: boolean;
  gender: string;
  document: QuestionnaireDocumentInterface;
}
