export interface OrderInterface {
  id: number;
  date: string;
  status: string;
  shortAddress: string;
  address: string;
  services: OrderServiceInterface[];
}

interface OrderServiceInterface {
  userName: string;
  title: string;
  price: number;
  priceType: string;
}
