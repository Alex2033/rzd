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
  kid: QuestionnaireKidInterface;
}

interface QuestionnaireDocumentInterface {
  citizenship: string;
  docNumber: string;
  issued: string;
  issueDate: string;
}

interface QuestionnaireKidInterface {
  id: number;
  name: string;
  age: string;
  surname: string;
  patronymic: string;
  date: string;
  gender: string;
  document: QuestionnaireDocumentInterface;
}
