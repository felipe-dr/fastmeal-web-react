import classNames from 'classnames';

import InputComponent from 'shared/components/input/input.component';

export default function OrderAddressFormComponent(): JSX.Element {
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
      <InputComponent name="post-code" type="text" placeholder="CEP" />
      <InputComponent name="address" type="text" placeholder="Endereço" />
      <InputComponent name="number" type="text" placeholder="Número" />
      <InputComponent name="district" type="text" placeholder="Bairro" />
      <InputComponent name="complement" type="text" placeholder="Complemento" />
    </>
  );
}
