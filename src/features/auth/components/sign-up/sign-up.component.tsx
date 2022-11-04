/* eslint-disable react/jsx-props-no-spreading */
import { FormEvent, useEffect, useState } from 'react';
import { RiLock2Line, RiMailLine, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from 'core/contexts/user/user.context';
import useFetch from 'core/hooks/use-fetch/use-fetch.hook';
import useFormInput from 'core/hooks/use-form-input/use-form-input.hook';
import handleSubmit from 'core/utils/forms/triggers/handle-submit/handle-submit.util';

import ButtonLinkComponent from 'shared/components/button-link/button-link.component';
import ErrorsComponent from 'shared/components/errors/errors.component';
import InputComponent from 'shared/components/input/input.component';
import { ServiceRequest } from 'shared/types/service-request.type';

import { User } from 'features/auth/interfaces/user.interface';

export default function SignUpComponent(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const { request, statusMessage, isLoading, errors } = useFetch<User>();
  const { signUp } = useUserContext();
  const navigate = useNavigate();

  const formFields = {
    name: useFormInput({
      validators: [{ required: true }, { minlength: 3 }],
      fieldName: 'Nome',
    }),
    email: useFormInput({
      validators: [{ required: true }, { email: true }],
      fieldName: 'E-mail',
    }),
    password: useFormInput({
      validators: [{ required: true }, { minlength: 4 }],
      fieldName: 'Senha',
    }),
    passwordConfirm: useFormInput({
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
    event.preventDefault();

    const { isValidForm, formFieldsObject } = handleSubmit({ formFields });

    if (isValidForm) {
      const isSuccessResponse = await signUp({
        serviceRequest,
        formFieldsObject,
        formFields,
      });

      if (isSuccessResponse) {
        navigate(-2);
      }
    }
  }

  return (
    <>
      {errors?.length > 0 && (
        <ErrorsComponent
          styleClasses="u-mt-15"
          errorTitle={statusMessage}
          errors={errors}
        />
      )}
      <form
        className="l-form--auth u-display-grid u-gap-y-20 u-width-100 u-mt-30 u-mb-45"
        onSubmit={(event) => onSubmit(event, request)}
      >
        <InputComponent
          name="name"
          type="text"
          placeholder="Nome"
          autoFocus
          {...formFields.name}
        >
          <RiUserLine size={20} className="u-text-base-3" />
        </InputComponent>
        <InputComponent
          name="email"
          type="text"
          placeholder="E-mail"
          {...formFields.email}
        >
          <RiMailLine size={20} className="u-text-base-3" />
        </InputComponent>
        <InputComponent
          name="password"
          type="password"
          placeholder="Senha"
          {...formFields.password}
        >
          <RiLock2Line size={20} className="u-text-base-3" />
        </InputComponent>
        <InputComponent
          name="password-confirm"
          type="password"
          placeholder="Confirmar senha"
          {...formFields.passwordConfirm}
        >
          <RiLock2Line size={20} className="u-text-base-3" />
        </InputComponent>
        <ButtonLinkComponent
          elementType="button"
          visualType="button"
          appearance="default"
          color="base-3"
          hoverColor="primary"
          disabled={isLoading}
          type="submit"
        >
          Registrar
        </ButtonLinkComponent>
      </form>
      <div className="u-display-flex u-flex-wrap u-flex-justify-content-center u-gap-5 s1">
        <p>Já é registrado?</p>
        <ButtonLinkComponent
          elementType="link"
          visualType="link"
          appearance="default"
          color="base-3"
          hoverColor="primary"
          to="/auth/signin"
        >
          Voltar e se autenticar
        </ButtonLinkComponent>
      </div>
    </>
  );
}
