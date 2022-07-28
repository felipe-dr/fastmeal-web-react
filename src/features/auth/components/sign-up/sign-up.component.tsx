/* eslint-disable react/jsx-props-no-spreading */
import { FormEvent, useEffect, useState } from 'react';
import { RiLock2Line, RiMailLine, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import useFetch from 'core/hooks/use-fetch/use-fetch.hook';
import useForm, {
  handleResponse,
  handleSubmit,
} from 'core/hooks/use-form/use-form.hook';
import AuthService from 'core/services/auth/auth.service';

import ButtonLink from 'shared/components/button-link/button-link.component';
import Errors from 'shared/components/errors/errors.component';
import Input from 'shared/components/input/input.component';
import { ServiceRequest } from 'shared/types/service-request.type';

import { User } from 'features/auth/interfaces/user.interface';

export default function SignUp(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { request, statusMessage, errors } = useFetch<User>();

  const formFields = {
    name: useForm({
      validators: [{ required: true }, { minlength: 3 }],
      fieldName: 'Nome',
    }),
    email: useForm({
      validators: [{ required: true }, { email: true }],
      fieldName: 'E-mail',
    }),
    password: useForm({
      validators: [{ required: true }, { minlength: 4 }],
      fieldName: 'Senha',
    }),
    passwordConfirm: useForm({
      validators: [{ required: true }, { minlength: 4 }, { equals: password }],
      fieldName: 'Confirmar senha',
      customMessage: 'Senhas não conferem',
    }),
  };

  useEffect(() => {
    setPassword(formFields.password.value);
  }, [formFields.password.value]);

  async function onSubmit(
    event: FormEvent<HTMLFormElement>,
    serviceRequest: ServiceRequest<User>
  ): Promise<void> {
    const { isValidForm, formFieldsObject } = handleSubmit({ formFields });
    let isSuccessResponse: boolean;

    event.preventDefault();

    if (isValidForm) {
      const authService = AuthService.getInstance();
      const response = await serviceRequest(
        authService.create(formFieldsObject)
      );

      isSuccessResponse = handleResponse({ response, formFields });

      if (isSuccessResponse) {
        navigate(-2);
      }
    }
  }

  return (
    <>
      {errors?.length > 0 && (
        <Errors
          styleClasses="u-mt-15"
          errorTitle={statusMessage}
          errors={errors}
        />
      )}
      <form
        className="l-form--auth u-display-grid u-gap-y-20 u-width-100 u-mt-30 u-mb-45"
        onSubmit={(event) => onSubmit(event, request)}
      >
        <Input
          name="name"
          type="text"
          placeholder="Nome"
          autoFocus
          {...formFields.name}
        >
          <RiUserLine size={20} className="u-text-base-3" />
        </Input>
        <Input
          name="email"
          type="text"
          placeholder="E-mail"
          {...formFields.email}
        >
          <RiMailLine size={20} className="u-text-base-3" />
        </Input>
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          {...formFields.password}
        >
          <RiLock2Line size={20} className="u-text-base-3" />
        </Input>
        <Input
          name="password-confirm"
          type="password"
          placeholder="Confirmar senha"
          {...formFields.passwordConfirm}
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
