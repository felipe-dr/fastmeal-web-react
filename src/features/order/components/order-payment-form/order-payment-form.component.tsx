import classNames from 'classnames';

import useFormRadio from 'core/hooks/use-form-radio/use-form-radio.hook';

import RadioButtonGroupComponent from 'shared/components/radio-button-group/radio-button-group.component';

export default function OrderPaymentFormComponent(): JSX.Element {
  const paymentMethods = [
    {
      id: 'money',
      label: 'Dinheiro',
      name: 'payment-methods',
    },
    {
      id: 'debit-card',
      label: 'Cartão de débito',
      name: 'payment-methods',
    },
    {
      id: 'meal-card',
      label: 'Cartão de refeição',
      name: 'payment-methods',
    },
  ];

  const { selectedValue, onChange } = useFormRadio({});

  return (
    <>
      <legend
        className={classNames({
          't2 u-text-base-3 u-text-uppercase u-font-semibold': true,
          'u-border-bottom-1': true,
          'u-mb-20 u-pb-5': true,
        })}
      >
        Formas de pagamento
      </legend>
      <RadioButtonGroupComponent
        options={paymentMethods}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    </>
  );
}
