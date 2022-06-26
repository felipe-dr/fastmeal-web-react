/* eslint-disable @typescript-eslint/no-shadow */
import { ChangeEvent, useState } from 'react';

import FORM_REGEX from 'core/constants/regex';
import stringToBoolean from 'core/utils/conversions/conversions.util';

import {
  GetValidatorParams,
  HandleClearParams,
  HandleSubmitParams,
  UseFormProps,
  UseFormReturn,
  ValidatorsKeyof,
} from './types/use-form.type';

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
        isValid: stringToBoolean(`${FORM_REGEX.email.test(fieldValue)}`),
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
 * Function that receives an object with form fields and returns whether it is
 * valid or not.
 *
 * @typedef {object} HandleSubmitParams
 * @property {FormEvent} event
 * @property {object} formFields
 * @returns {boolean}
 */
export function handleSubmit({
  event,
  formFields,
}: HandleSubmitParams): boolean {
  event.preventDefault();
  let isValidForm = true;

  Object.entries(formFields).forEach((field) => {
    const isValidField = field[1].validate();

    if (!isValidField) {
      isValidForm = false;
    }
  });

  return isValidForm;
}
