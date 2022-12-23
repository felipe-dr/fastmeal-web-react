import { useToastContext } from 'core/contexts/toast/toast.context';
import uuid from 'core/utils/generations/uuid';

import { HandleClearParams } from './interfaces/handle-clear.interface';
import { HandleResponseParams } from './interfaces/handle-response.interface';
import {
  HandleSubmitParams,
  HandleSubmitReturn,
} from './interfaces/handle-submit.interface';
import { UseFormReturn } from './interfaces/use-form.interface';

/**
 * Hook that returns essential form triggers.
 *
 * @returns {UseFormReturn<T>}
 */
export default function useForm<T>(): UseFormReturn<T> {
  const { addToast } = useToastContext({});

  /**
   * Function that receives an object with form fields that make them empty.
   *
   * @typedef {object} HandleClearParams
   * @property {object} formFields
   * @returns {void}
   */
  function handleClear({ formFields }: HandleClearParams): void {
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
  function handleSubmit({
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
  function handleResponse({
    response,
    formFields,
    messageTitle,
    customSuccessMessage,
    customErrorMessage,
  }: HandleResponseParams<T>): boolean {
    const { parseBody } = response;
    const isSuccessResponse = parseBody?.success;
    const responseMessage = parseBody?.statusMessage;
    const successMessage = customSuccessMessage || responseMessage;
    const errorMessage = customErrorMessage || responseMessage;

    if (isSuccessResponse) {
      addToast({
        id: uuid(),
        title: messageTitle,
        type: 'success',
        message: `${successMessage}`,
      });

      handleClear({ formFields });

      return true;
    }

    addToast({
      id: uuid(),
      title: messageTitle,
      type: 'danger',
      message: `${errorMessage}`,
    });

    return false;
  }

  return {
    handleClear,
    handleSubmit,
    handleResponse,
  };
}
