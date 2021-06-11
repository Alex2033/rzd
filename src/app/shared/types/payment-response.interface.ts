export interface PaymentResponseInterface {
  id: string;
  status: string;
  payment_page: string | null;
  sum: number;
}
