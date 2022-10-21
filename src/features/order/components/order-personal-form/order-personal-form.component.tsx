import classNames from 'classnames';

import InputComponent from 'shared/components/input/input.component';

export default function OrderPersonalFormComponent(): JSX.Element {
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
        name="name"
        type="text"
        placeholder="Nome completo"
        autoFocus
      />
      <InputComponent name="cpf" type="text" placeholder="CPF" />
      <InputComponent name="email" type="text" placeholder="E-mail" />
      <InputComponent name="phone" type="text" placeholder="Telefone" />
    </>
  );
}
