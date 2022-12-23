export interface HandleSubmitParams {
  formFields: object;
}

export interface HandleSubmitReturn {
  isValidForm: boolean;
  formFieldsObject: { [key: string]: string };
}
