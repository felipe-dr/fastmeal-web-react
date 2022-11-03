/* eslint-disable react/jsx-props-no-spreading */
import { FormEvent } from 'react';
import { RiLock2Line, RiMailLine } from 'react-icons/ri';
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

export default function SignInComponent(): JSX.Element {
  const { request, statusMessage, isLoading, errors } = useFetch<User>();
  const { signIn } = useUserContext();
  const navigate = useNavigate();

  const formFields = {
    email: useFormInput({
      validators: [{ required: true }, { email: true }],
      fieldName: 'E-mail',
    }),
    password: useFormInput({
      validators: [{ required: true }, { minlength: 4 }],
      fieldName: 'Senha',
    }),
  };

  async function onSubmit(
    event: FormEvent<HTMLFormElement>,
    serviceRequest: ServiceRequest<User>
  ): Promise<void> {
    event.preventDefault();

    const { isValidForm, formFieldsObject } = handleSubmit({ formFields });

    if (isValidForm) {
      const isSuccessResponse = await signIn({
        serviceRequest,
        formFieldsObject,
        formFields,
      });

      if (isSuccessResponse) {
        navigate(-1);
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
          name="email"
          type="text"
          placeholder="E-mail"
          autoFocus
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
        <ButtonLinkComponent
          elementType="button"
          visualType="button"
          appearance="default"
          color="base-3"
          hoverColor="primary"
          disabled={isLoading}
          type="submit"
        >
          Entrar
        </ButtonLinkComponent>
      </form>
      <div className="u-display-flex u-flex-wrap u-flex-justify-content-center u-gap-5 s1">
        <p>Não é registrado?</p>
        <ButtonLinkComponent
          elementType="link"
          visualType="link"
          appearance="default"
          color="base-3"
          hoverColor="primary"
          to="/auth/signup"
        >
          Criar nova conta
        </ButtonLinkComponent>
      </div>
    </>
  );
}
