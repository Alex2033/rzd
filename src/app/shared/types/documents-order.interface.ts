export interface DocumentsOrderInterface {
  id_anketa: number;
  fio: string;
  age: string;
  id_parent: number;
  parent_fio: string;
  documents: DocumentInterface[];
}

interface DocumentInterface {
  id: number;
  name: string;
}
