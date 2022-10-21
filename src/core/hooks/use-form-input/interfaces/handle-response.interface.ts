import { HttpResponse } from 'shared/interfaces/http-response.interface';

import { UseFormInputReturn } from './use-form-input.interface';

export interface HandleResponseParams<T> {
  response: HttpResponse<T>;
  formFields: { [key: string]: UseFormInputReturn };
  customSuccessMessage?: string;
  customErrorMessage?: string;
}
