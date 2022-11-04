/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';

import InputComponent from 'shared/components/input/input.component';

import { OrderFormFieldsProps } from 'features/order/interfaces/order-form-fields.interface';

export default function OrderAddressFormComponent({
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
        Endereço de entrega
      </legend>
      <InputComponent
        name="cep"
        type="text"
        placeholder="CEP"
        {...formFields.cep}
      />
      <InputComponent
        name="public-place"
        type="text"
        placeholder="Logradouro"
        {...formFields.publicPlace}
      />
      <InputComponent
        name="number"
        type="text"
        placeholder="Número"
        {...formFields.number}
      />
      <InputComponent
        name="district"
        type="text"
        placeholder="Bairro"
        {...formFields.district}
      />
      <InputComponent
        name="complement"
        type="text"
        placeholder="Complemento"
        {...formFields.complement}
      />
      <InputComponent
        name="city"
        type="text"
        placeholder="Cidade"
        {...formFields.city}
      />
      <InputComponent
        name="uf"
        type="text"
        placeholder="UF"
        {...formFields.uf}
      />
    </>
  );
}
