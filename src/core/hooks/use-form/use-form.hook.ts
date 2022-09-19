/* eslint-disable @typescript-eslint/no-shadow */
import { ChangeEvent, useState } from 'react';

import formRegex from 'core/constants/regex.constant';
import stringToBoolean from 'core/utils/conversions/variable-type.util';

import { GetValidatorParams } from './interfaces/get-validator.interface';
import { HandleClearParams } from './interfaces/handle-clear.interface';
import { HandleResponseParams } from './interfaces/handle-response.interface';
import { UseFormProps, UseFormReturn } from './interfaces/use-form.interface';
import {
  HandleSubmitParams,
  HandleSubmitReturn,
} from './types/handle-submit.type';
import { ValidatorsKeyof } from './types/validators.type';

/**
 * Hook that receives a list with validation types and field name, in order to
 * validate it and return the state of this validation.
 *
 * @typedef {object} UseFormProps
 * @property {object[]} [validators]
 * @property {string} [fieldName=Campo]
 * @property {string} [customMessage]
 * @returns {UseFormReturn}
 */
export default function useForm({
  validators,
  fieldName = 'Campo',
  customMessage,
}: UseFormProps): UseFormReturn {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  /**
   * Function that returns an object containing the validation result and the
   * feedback message through the name of the received validator.
   *
   * @typedef {object} GetValidatorParams
   * @property {object} validatorName
   * @property {string | number | boolean} validatorValue
   * @property {string} fieldName
   * @property {string} fieldValue
   * @property {string} [customMessage]
   * @returns {object}
   */
  function getValidator({
    validatorName,
    validatorValue,
    fieldName,
    fieldValue,
    customMessage,
  }: GetValidatorParams) {
    const validators = {
      required: {
        isValid: stringToBoolean(`${fieldValue.length > 0}`),
        message: `${fieldName} é obrigatório.`,
      },
      minlength: {
        isValid: stringToBoolean(`${fieldValue.length >= validatorValue}`),
        message: `${fieldName} deve ter no mínimo ${validatorValue} caracteres.`,
      },
      email: {
        isValid: stringToBoolean(`${formRegex.EMAIL.test(fieldValue)}`),
        message: `${fieldName} inválido.`,
      },
      equals: {
        isValid: stringToBoolean(`${fieldValue === validatorValue}`),
        message: `${customMessage}`,
      },
    };

    return validators[validatorName];
  }

  /**
   * Function that receives the value of the field, gets the specific validator
   * for that field and returns if it is invalid to display a feedback message.
   *
   * @param {string} fieldValue
   * @returns {boolean}
   */
  function handleValidation(fieldValue: string): boolean {
    if (validators === undefined) {
      return true;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const validator of validators) {
      const validatorObj = Object.entries(validator);
      const validatorName = validatorObj[0][0] as ValidatorsKeyof;
      const validatorValue = validatorObj[0][1];
      const validatorResult = getValidator({
        validatorName,
        validatorValue,
        fieldName,
        fieldValue,
        customMessage,
      });

      if (!validatorResult.isValid) {
        setError(validatorResult.message);

        return false;
      }
    }

    setError('');

    return true;
  }

  /**
   * Function that receives the 'target' of the field and requests its
   * validation if there is an error message, until it becomes valid.
   *
   * @param {EventTarget} target
   * @returns {void}
   */
  function onChange({ target }: ChangeEvent<HTMLInputElement>): void {
    if (error) {
      handleValidation(target.value);
    }

    setValue(target.value);
  }

  /**
   * Function that receives the value of a field which, if not empty, will call
   * the validation function.
   *
   * @param {string} fieldValue
   * @returns {void}
   */
  function handleOnBlur(fieldValue: string): void {
    if (fieldValue !== '') {
      handleValidation(fieldValue);
    }
  }

  return {
    value,
    setValue,
    error,
    onChange,
    validate: () => handleValidation(value),
    onBlur: () => handleOnBlur(value),
  };
}

/**
 * Function that receives an object with form fields that make them empty.
 *
 * @typedef {object} HandleClearParams
 * @property {object} formFields
 * @returns {void}
 */
export function handleClear({ formFields }: HandleClearParams): void {
  Object.entries(formFields).forEach((field) => {
    field[1].setValue('');
  });
}

/**
 * Function that receives an object with form fields, returning if it is valid
 * or not, as well as an object with the name and value of each form field.
 *
 * @typedef {object} HandleSubmitParams
 * @property {object} formFields
 * @returns {HandleSubmitReturn}
 */
export function handleSubmit({
  formFields,
}: HandleSubmitParams): HandleSubmitReturn {
  let isValidForm = true;
  const formFieldsObject: { [key: string]: string } = {};

  Object.entries(formFields).forEach((field) => {
    const isValidField = field[1].validate();

    formFieldsObject[field[0]] = field[1].value;

    if (!isValidField) {
      isValidForm = false;
    }
  });

  return { isValidForm, formFieldsObject };
}

/**
 * Function that receives a response and form fields, to display a custom or
 * standardized response message, clear the form fields on success, and return
 * the status of that response.
 *
 * @typedef {object} HandleResponseParams<T>
 * @property {HttpResponse} response
 * @property {object} formFields
 * @property {string} [customSuccessMessage]
 * @property {string} [customErrorMessage]
 * @returns {boolean}
 */
export function handleResponse<T>({
  response,
  formFields,
  customSuccessMessage,
  customErrorMessage,
}: HandleResponseParams<T>): boolean {
  const { parseBody } = response;
  const isSuccessResponse = parseBody?.success;
  const responseMessage = parseBody?.statusMessage;
  const successMessage = customSuccessMessage || responseMessage;
  const errorMessage = customErrorMessage || responseMessage;

  if (isSuccessResponse) {
    alert(successMessage);
    handleClear({ formFields });

    return true;
  }

  alert(errorMessage);

  return false;
}
