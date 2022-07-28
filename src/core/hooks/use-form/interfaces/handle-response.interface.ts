import { HttpResponse } from 'shared/interfaces/http-response.interface';

import { UseFormReturn } from './use-form.interface';

export interface HandleResponseParams<T> {
  response: HttpResponse<T>;
  formFields: { [key: string]: UseFormReturn };
  customSuccessMessage?: string;
  customErrorMessage?: string;
}
