import { UseFormInputReturn } from 'core/hooks/use-form-input/interfaces/use-form-input.interface';

import { HttpResponse } from 'shared/interfaces/http-response.interface';

export interface HandleResponseParams<T> {
  response: HttpResponse<T>;
  formFields: { [key: string]: UseFormInputReturn };
  messageTitle?: string;
  customSuccessMessage?: string;
  customErrorMessage?: string;
}
