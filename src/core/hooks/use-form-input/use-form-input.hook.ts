/* eslint-disable @typescript-eslint/no-shadow */
import { FormEvent, useState } from 'react';

import formValidationsRegex from 'core/constants/regex.constant';
import stringToBoolean from 'core/utils/conversions/variable-type.util';
import cepMask from 'core/utils/forms/masks/cep-mask.util';
import cpfMask from 'core/utils/forms/masks/cpf-mask.util';
import phoneMask from 'core/utils/forms/masks/phone-mask.util';
import isValidCPF from 'core/utils/forms/validations/cpf-validation.util';

import { GetValidatorParams } from './interfaces/get-validator.interface';
import {
  UseFormInputProps,
  UseFormInputReturn,
} from './interfaces/use-form-input.interface';
import { ValidatorsKeyof } from './types/validators.type';

/**
 * Hook that receives a list with validation types, field name and mask in order
 * to validate it and return the state of this validation.
 *
 * @typedef {object} UseFormInputProps
 * @property {object[]} [validators]
 * @property {string} [fieldName=Campo]
 * @property {string} [customMessage]
 * @property {string} [mask]
 * @returns {UseFormInputReturn}
 */
export default function useFormInput({
  validators,
  fieldName = 'Campo',
  customMessage,
  mask,
}: UseFormInputProps): UseFormInputReturn {
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
      equals: {
        isValid: stringToBoolean(`${fieldValue === validatorValue}`),
        message: `${customMessage}`,
      },
      onlyLetters: {
        isValid: stringToBoolean(
          `${formValidationsRegex.ONLY_LETTERS.test(fieldValue)}`
        ),
        message: `${fieldName} deve ter somente letras.`,
      },
      onlyNumbers: {
        isValid: stringToBoolean(
          `${formValidationsRegex.ONLY_NUMBERS.test(fieldValue)}`
        ),
        message: `${fieldName} deve ter somente números.`,
      },
      cpf: {
        isValid: isValidCPF(fieldValue),
        message: `${fieldName} inválido.`,
      },
      phone: {
        isValid: stringToBoolean(
          `${formValidationsRegex.PHONE.test(fieldValue)}`
        ),
        message: `${fieldName} inválido.`,
      },
      email: {
        isValid: stringToBoolean(
          `${formValidationsRegex.EMAIL.test(fieldValue)}`
        ),
        message: `${fieldName} inválido.`,
      },
    };

    return validators[validatorName];
  }

  /**
   * Function that receives an event from a field and invokes the mask function
   * that has been defined.
   *
   * @param {FormEvent<HTMLInputElement>} event
   * @returns {void}
   */
  function handleMasks(event: FormEvent<HTMLInputElement>): void {
    switch (mask) {
      case 'cpf':
        cpfMask(event);
        break;
      case 'phone':
        phoneMask(event);
        break;
      case 'cep':
        cepMask(event);
        break;
      default:
    }
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
   * Function that receives the 'event' from the field, applies mask if there is
   * one and requests its validation if there is an error message, until it
   * becomes valid.
   *
   * @param {FormEvent<HTMLInputElement>} event
   * @returns {void}
   */
  function onChange(event: FormEvent<HTMLInputElement>): void {
    const { currentTarget } = event;

    if (mask) {
      handleMasks(event);
    }

    if (error) {
      handleValidation(currentTarget.value);
    }

    setValue(currentTarget.value);
  }

  /**
   * Function that receives the value of a field and that will call the
   * validation function.
   *
   * @param {string} fieldValue
   * @returns {void}
   */
  function handleOnBlur(fieldValue: string): void {
    handleValidation(fieldValue);
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
