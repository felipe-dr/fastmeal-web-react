import { ValidatorsKeyof } from '../types/validators.type';

export interface GetValidatorParams {
  validatorName: ValidatorsKeyof;
  validatorValue: string | number | boolean;
  fieldName: string;
  fieldValue: string;
  customMessage?: string;
}
