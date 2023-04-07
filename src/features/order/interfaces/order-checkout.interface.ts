export interface OrderCheckout {
  personalData: { [key: string]: string };
  addressData: { [key: string]: string };
  paymentMethod: string;
  orderItems: { id: string; quantity: number }[];
}
