import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useOrderContext } from 'core/contexts/order/order.context';
import { useUserContext } from 'core/contexts/user/user.context';
import useFetch from 'core/hooks/use-fetch/use-fetch.hook';
import useFormInput from 'core/hooks/use-form-input/use-form-input.hook';
import useFormRadio from 'core/hooks/use-form-radio/use-form-radio.hook';
import useForm from 'core/hooks/use-form/use-form.hook';
import {
  sanitizeField,
  sanitizePhone,
} from 'core/utils/forms/sanitation/sanitation.util';

import { OrderCheckout } from 'features/order/interfaces/order-checkout.interface';
import OrderCheckoutService from 'features/order/services/order-checkout/order-checkout.service';

import {
  FormDataGroupingParams,
  FormDataGroupingReturn,
} from './interfaces/form-data-grouping.interface';
import { SanitizesWithSpecificityParams } from './interfaces/sanitizes-with-specificity.interface';
import { UseOrderFormReturn } from './interfaces/use-order-form.interface';

export default function useOrderForm(): UseOrderFormReturn {
  const { handleSubmit, handleResponse } = useForm();
  const { orderItems, clearOrderItems } = useOrderContext();
  const { isAuthenticatedUser } = useUserContext();
  const { selectedValue, error, handleValidation, onChange } = useFormRadio({
    radioGroupName: 'Forma de pagamento',
  });
  const [hasOrderItems, setHasOrderItems] = useState<boolean>(true);
  const { request, isLoading, errors } = useFetch<OrderCheckout>();
  const navigate = useNavigate();

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
      mask: 'uf',
    }),
  };

  function sanitizesWithSpecificity({
    formFieldKey,
    formFieldValue,
  }: SanitizesWithSpecificityParams) {
    let value = formFieldValue;

    if (formFieldKey === 'phone') {
      value = sanitizePhone(value);
    }

    return sanitizeField(value);
  }

  function formDataGrouping({
    formFieldsObject,
  }: FormDataGroupingParams): FormDataGroupingReturn {
    const personalDataGroup = ['cpf', 'fullName', 'phone'];
    const addressDataGroup = [
      'cep',
      'publicPlace',
      'number',
      'district',
      'complement',
      'city',
      'uf',
    ];
    const personalData: { [key: string]: string } = {};
    const addressData: { [key: string]: string } = {};

    Object.entries(formFieldsObject).forEach(
      ([formFieldKey, formFieldValue]) => {
        if (
          personalDataGroup.find(
            (personalDataKey) => personalDataKey === formFieldKey
          )
        ) {
          personalData[formFieldKey] = sanitizesWithSpecificity({
            formFieldKey,
            formFieldValue,
          });
        }

        if (
          addressDataGroup.find(
            (addressDataKey) => addressDataKey === formFieldKey
          )
        ) {
          addressData[formFieldKey] = sanitizesWithSpecificity({
            formFieldKey,
            formFieldValue,
          });
        }
      }
    );

    return {
      personalData,
      addressData,
    };
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasOrderItems(orderItems.length > 0 ?? false);

    const { isValidForm, formFieldsObject } = handleSubmit({ formFields });
    const isSelectedPaymentMethod = handleValidation();
    const isValidOrderCheckout =
      isAuthenticatedUser &&
      isValidForm &&
      hasOrderItems &&
      isSelectedPaymentMethod;

    if (isValidOrderCheckout) {
      const { personalData, addressData } = formDataGrouping({
        formFieldsObject,
      });
      const orderItemnsIdQunatity = orderItems.map(({ id, quantity }) => {
        return {
          id,
          quantity,
        };
      });
      const orderCheckoutData: OrderCheckout = {
        personalData,
        addressData,
        paymentMethod: selectedValue.replace('radio-option-', ''),
        orderItems: orderItemnsIdQunatity,
      };
      const orderCheckoutService = new OrderCheckoutService();

      const response = await request(
        orderCheckoutService.create(orderCheckoutData)
      );

      handleResponse({
        response,
        formFields,
        messageTitle: 'Pedido',
      });

      if (!errors.length) {
        clearOrderItems(false);
        navigate('/');
      }
    }
  }

  useEffect(() => {
    if (!isAuthenticatedUser) {
      navigate('/auth/signin');
    }
  }, [isAuthenticatedUser]);

  useEffect(() => {
    setHasOrderItems(orderItems.length > 0 ?? false);
  }, [orderItems]);

  return {
    formFields,
    hasOrderItems,
    paymentMethodRadio: { selectedValue, error, onChange },
    isLoading,
    onSubmit,
  };
}
