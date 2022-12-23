import { HandleClearParams } from './handle-clear.interface';
import { HandleResponseParams } from './handle-response.interface';
import {
  HandleSubmitParams,
  HandleSubmitReturn,
} from './handle-submit.interface';

export interface UseFormReturn<T> {
  handleClear: ({ formFields }: HandleClearParams) => void;
  handleSubmit: ({ formFields }: HandleSubmitParams) => HandleSubmitReturn;
  handleResponse: ({
    response,
    formFields,
    customSuccessMessage,
    customErrorMessage,
  }: HandleResponseParams<T>) => boolean;
}
