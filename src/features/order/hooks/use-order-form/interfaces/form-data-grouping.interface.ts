export interface FormDataGroupingParams {
  formFieldsObject: { [key: string]: string };
}

export interface FormDataGroupingReturn {
  personalData: {
    [key: string]: string;
  };
  addressData: {
    [key: string]: string;
  };
}
