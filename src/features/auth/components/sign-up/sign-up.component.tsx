/* eslint-disable react/jsx-props-no-spreading */
import { FormEvent, useEffect, useState } from 'react';
import { RiLock2Line, RiMailLine, RiUserLine } from 'react-icons/ri';

import useForm, {
  handleClear,
  handleSubmit,
} from 'core/hooks/use-form/useForm.hook';

import ButtonLink from 'shared/components/button-link/button-link.component';
import Input from 'shared/components/input/input.component';

export default function SignUp(): JSX.Element {
  const [password, setPassword] = useState('');

  const formFields = {
    userName: useForm({
      validators: [{ required: true }, { minlength: 3 }],
      fieldName: 'Nome',
    }),
    userEmail: useForm({
      validators: [{ required: true }, { email: true }],
      fieldName: 'E-mail',
    }),
    userPassword: useForm({
      validators: [{ required: true }, { minlength: 4 }],
      fieldName: 'Senha',
    }),
    userPasswordConfirm: useForm({
      validators: [{ required: true }, { minlength: 4 }, { equals: password }],
      fieldName: 'Confirmar senha',
      customMessage: 'Senhas não conferem',
    }),
  };

  useEffect(() => {
    setPassword(formFields.userPassword.value);
  }, [formFields.userPassword.value]);

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    if (handleSubmit({ event, formFields })) {
      alert('Registro efetuado com sucesso');

      handleClear({ formFields });
    }
  }

  return (
    <>
      <form
        className="u-display-grid u-gap-y-20 u-width-100 u-mt-30 u-mb-45"
        onSubmit={onSubmit}
      >
        <Input
          name="name"
          type="text"
          placeholder="Nome"
          autoFocus
          {...formFields.userName}
        >
          <RiUserLine size={20} className="u-text-base-3" />
        </Input>
        <Input
          name="email"
          type="text"
          placeholder="E-mail"
          {...formFields.userEmail}
        >
          <RiMailLine size={20} className="u-text-base-3" />
        </Input>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          {...formFields.userPassword}
        >
          <RiLock2Line size={20} className="u-text-base-3" />
        </Input>
        <Input
          name="password-confirm"
          type="password"
          placeholder="Confirmar senha"
          {...formFields.userPasswordConfirm}
        >
          <RiLock2Line size={20} className="u-text-base-3" />
        </Input>
        <ButtonLink
          elementType="button"
          visualType="button"
          appearance="default"
          color="base-3"
          type="submit"
        >
          Registrar
        </ButtonLink>
      </form>
      <div className="u-display-flex u-flex-wrap u-flex-justify-content-center u-gap-5 s1">
        <p>Já é registrado?</p>
        <ButtonLink
          elementType="link"
          visualType="link"
          appearance="default"
          color="base-3"
          to="/auth/signin"
        >
          Voltar e se autenticar
        </ButtonLink>
      </div>
    </>
  );
}
