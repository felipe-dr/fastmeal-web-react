export type Validators = {
  required: object;
  minlength: object;
  email: object;
  equals: object;
};

export type ValidatorsKeyof = keyof Validators;
