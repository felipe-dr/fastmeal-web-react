/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';

import InputComponent from 'shared/components/input/input.component';

import { OrderFormFieldsProps } from 'features/order/interfaces/order-form-fields.interface';

export default function OrderAccountFormComponent({
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
        Dados da conta
      </legend>
      <InputComponent
        name="username"
        type="text"
        placeholder="Nome de usuário"
        {...formFields.username}
      />
      <InputComponent
        name="email"
        type="text"
        placeholder="E-mail"
        {...formFields.email}
      />
      <InputComponent
        name="password"
        type="password"
        placeholder="Senha"
        {...formFields.password}
      />
      <InputComponent
        name="password-confirm"
        type="password"
        placeholder="Confirmar senha"
        {...formFields.passwordConfirm}
      />
    </>
  );
}
