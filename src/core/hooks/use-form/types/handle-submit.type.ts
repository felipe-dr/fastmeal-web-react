import { HandleClearParams } from '../interfaces/handle-clear.interface';

export type HandleSubmitParams = HandleClearParams;

export type HandleSubmitReturn = {
  isValidForm: boolean;
  formFieldsObject: { [key: string]: string };
};
