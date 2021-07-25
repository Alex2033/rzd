import { QuestionnaireContentInterface } from './questionnaire-content.interface';

export interface QuestionnaireDetailInterface {
  id?: number;
  ext_id?: string;
  id_parent: number;
  age?: number;
  draft?: boolean;
  content?: QuestionnaireContentInterface;
}
