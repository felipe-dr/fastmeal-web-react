import { UseFormInputReturn } from 'core/hooks/use-form-input/interfaces/use-form-input.interface';

import { ServiceRequest } from 'shared/types/service-request.type';

import { User } from 'features/auth/interfaces/user.interface';

export interface SignInParams {
  serviceRequest: ServiceRequest<User>;
  formFieldsObject: {
    [key: string]: string;
  };
  formFields: { [key: string]: UseFormInputReturn };
}
