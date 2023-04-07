import { OrderPaymentFormProps } from 'features/order/interfaces/order-payment-form.interface';

export interface UseOrderFormReturn extends OrderPaymentFormProps {
  formFields: { [key: string]: object };
  hasOrderItems: boolean;
  isLoading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
