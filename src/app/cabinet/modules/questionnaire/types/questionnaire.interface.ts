import { KidInterface } from './kid.interface';
import { QuestionnaireDocumentInterface } from './questionnaire-document.interface';

export interface QuestionnaireInterface {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  date: string;
  gender: string;
  age: string;
  email: string;
  phone: string;
  document: QuestionnaireDocumentInterface;
  kids: KidInterface[];
}
