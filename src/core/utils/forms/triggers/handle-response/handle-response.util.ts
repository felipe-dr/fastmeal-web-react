import handleClear from '../handle-clear/handle-clear.util';
import { HandleResponseParams } from './interfaces/handle-response.interface';

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
export default function handleResponse<T>({
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
