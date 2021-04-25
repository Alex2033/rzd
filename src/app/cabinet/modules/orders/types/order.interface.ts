export interface OrderInterface {
  id: number;
  date: string;
  status: string;
  shortAddress: string;
  address: string;
  services: OrderServiceInterface[];
  documents: DocumentInterface[];
}

interface OrderServiceInterface {
  userName: string;
  title: string;
  price: number;
  priceType: string;
}

interface DocumentInterface {
  userName: string;
  paths: PathDocumentInterface[];
}

interface PathDocumentInterface {
  text: string;
  path: string;
}
