export type Validators = {
  required: object;
  minlength: object;
  equals: object;
  onlyLetters: object;
  onlyNumbers: object;
  cpf: object;
  phone: object;
  email: object;
};

export type ValidatorsKeyof = keyof Validators;
