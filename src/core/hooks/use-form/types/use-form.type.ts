export type Validators = {
  required: object;
  minlength: object;
  email: object;
  equals: object;
};

export type ValidatorsKeyof = keyof Validators;

export type GetValidatorParams = {
  validatorName: ValidatorsKeyof;
  validatorValue: string | number | boolean;
  fieldName: string;
  fieldValue: string;
  customMessage?: string;
};

export type UseFormProps = {
  validators?: {
    [key in ValidatorsKeyof]?: string | number | boolean;
  }[];
  fieldName?: string;
  customMessage?: string;
};

export type UseFormReturn = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  onBlur: () => void;
};

export type HandleClearParams = {
  formFields: object;
};

export type HandleSubmitParams = HandleClearParams & {
  event: React.FormEvent<HTMLFormElement>;
};
