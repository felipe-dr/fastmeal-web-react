import { FormEvent, useEffect, useState } from 'react';

import { useOrderContext } from 'core/contexts/order/order.context';
import useFormInput from 'core/hooks/use-form-input/use-form-input.hook';
import useFormRadio from 'core/hooks/use-form-radio/use-form-radio.hook';
import handleSubmit from 'core/utils/forms/triggers/handle-submit/handle-submit.util';

import { UseOrderFormReturn } from './interfaces/use-order-form.interface';

export default function useOrderForm(): UseOrderFormReturn {
  const { orderItems } = useOrderContext();
  const [password, setPassword] = useState<string>('');
  const { selectedValue, error, handleValidation, onChange } = useFormRadio({
    radioGroupName: 'Forma de pagamento',
  });

  const formFields = {
    cpf: useFormInput({
      validators: [{ required: true }, { cpf: true }],
      fieldName: 'CPF',
      mask: 'cpf',
    }),
    fullName: useFormInput({
      validators: [{ required: true }, { minlength: 5 }, { onlyLetters: true }],
      fieldName: 'Nome completo',
    }),
    phone: useFormInput({
      validators: [{ required: true }, { phone: true }],
      fieldName: 'Telefone',
      mask: 'phone',
    }),
    username: useFormInput({
      validators: [{ required: true }, { minlength: 3 }],
      fieldName: 'Nome de usuário',
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
    cep: useFormInput({
      validators: [{ required: true }, { minlength: 9 }],
      fieldName: 'CEP',
      mask: 'cep',
    }),
    publicPlace: useFormInput({
      validators: [{ required: true }],
      fieldName: 'Logradouro',
    }),
    number: useFormInput({
      validators: [{ required: true }, { onlyNumbers: true }],
      fieldName: 'Número',
    }),
    district: useFormInput({
      validators: [{ required: true }],
      fieldName: 'Bairro',
    }),
    complement: useFormInput({}),
    city: useFormInput({
      validators: [{ required: true }],
      fieldName: 'Cidade',
    }),
    uf: useFormInput({
      validators: [{ required: true }],
      fieldName: 'UF',
    }),
  };

  useEffect(() => {
    setPassword(formFields.password.value);
  }, [formFields.password.value]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { isValidForm, formFieldsObject } = handleSubmit({ formFields });
    const hasOrderItems = orderItems.length > 0;
    const isSelectedPaymentMethod = handleValidation();

    if (isValidForm && hasOrderItems && isSelectedPaymentMethod) {
      console.log('Form válido');
    }
  }

  return {
    formFields,
    paymentMethodRadio: { selectedValue, error, onChange },
    onSubmit,
  };
}
