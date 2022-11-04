import { OrderPaymentFormProps } from 'features/order/interfaces/order-payment-form.interface';

export interface UseOrderFormReturn extends OrderPaymentFormProps {
  formFields: { [key: string]: object };
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
