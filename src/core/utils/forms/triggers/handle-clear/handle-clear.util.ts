import { HandleClearParams } from './interfaces/handle-clear.interface';

/**
 * Function that receives an object with form fields that make them empty.
 *
 * @typedef {object} HandleClearParams
 * @property {object} formFields
 * @returns {void}
 */
export default function handleClear({ formFields }: HandleClearParams): void {
  Object.entries(formFields).forEach((field) => {
    field[1].setValue('');
  });
}
