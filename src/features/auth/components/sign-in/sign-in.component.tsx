/* eslint-disable react/jsx-props-no-spreading */
import { FormEvent } from 'react';
import { RiLock2Line, RiMailLine } from 'react-icons/ri';
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

export default function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const { request, statusMessage, errors } = useFetch<User>();

  const formFields = {
    email: useForm({
      validators: [{ required: true }, { email: true }],
      fieldName: 'E-mail',
    }),
    password: useForm({
      validators: [{ required: true }, { minlength: 4 }],
      fieldName: 'Senha',
    }),
  };

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
        authService.signIn(formFieldsObject)
      );

      isSuccessResponse = handleResponse({ response, formFields });

      if (isSuccessResponse) {
        navigate(-1);
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
          name="email"
          type="text"
          placeholder="E-mail"
          autoFocus
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
