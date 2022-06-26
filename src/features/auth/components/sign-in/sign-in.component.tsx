/* eslint-disable react/jsx-props-no-spreading */
import { FormEvent } from 'react';
import { RiLock2Line, RiMailLine } from 'react-icons/ri';

import useForm, {
  handleClear,
  handleSubmit,
} from 'core/hooks/use-form/useForm.hook';

import ButtonLink from 'shared/components/button-link/button-link.component';
import Input from 'shared/components/input/input.component';

export default function SignIn(): JSX.Element {
  const formFields = {
    userEmail: useForm({
      validators: [{ required: true }, { email: true }],
      fieldName: 'E-mail',
    }),
    userPassword: useForm({
      validators: [{ required: true }, { minlength: 4 }],
      fieldName: 'Senha',
    }),
  };

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    if (handleSubmit({ event, formFields })) {
      alert('Login efetuado com sucesso');

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
          name="email"
          type="text"
          placeholder="E-mail"
          autoFocus
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
        <ButtonLink
          elementType="button"
          visualType="button"
          appearance="default"
          color="base-3"
          type="submit"
        >
          Entrar
        </ButtonLink>
      </form>
      <div className="u-display-flex u-flex-wrap u-flex-justify-content-center u-gap-5 s1">
        <p>Não é registrado?</p>
        <ButtonLink
          elementType="link"
          visualType="link"
          appearance="default"
          color="base-3"
          to="/auth/signup"
        >
          Criar nova conta
        </ButtonLink>
      </div>
    </>
  );
}
