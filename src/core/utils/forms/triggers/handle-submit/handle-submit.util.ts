import {
  HandleSubmitParams,
  HandleSubmitReturn,
} from './interfaces/handle-submit.interface';

/**
 * Function that receives an object with form fields, returning if it is valid
 * or not, as well as an object with the name and value of each form field.
 *
 * @typedef {object} HandleSubmitParams
 * @property {object} formFields
 * @returns {HandleSubmitReturn}
 */
export default function handleSubmit({
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
