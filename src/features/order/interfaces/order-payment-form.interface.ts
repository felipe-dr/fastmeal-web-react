export interface OrderPaymentFormProps {
  paymentMethodRadio: {
    selectedValue: string;
    error: string;
    onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
