/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';

import InputComponent from 'shared/components/input/input.component';

import { OrderFormFieldsProps } from 'features/order/interfaces/order-form-fields.interface';

export default function OrderPersonalFormComponent({
  formFields,
}: OrderFormFieldsProps): JSX.Element {
  return (
    <>
      <legend
        className={classNames({
          't2 u-text-base-3 u-text-uppercase u-font-semibold': true,
          'u-border-bottom-1': true,
          'u-mb-20 u-pb-5': true,
        })}
      >
        Dados pessoais
      </legend>
      <InputComponent
        name="cpf"
        type="text"
        placeholder="CPF"
        autoFocus
        {...formFields.cpf}
      />
      <InputComponent
        name="name"
        type="text"
        placeholder="Nome completo"
        {...formFields.fullName}
      />
      <InputComponent
        name="phone"
        type="text"
        placeholder="Telefone"
        {...formFields.phone}
      />
    </>
  );
}
