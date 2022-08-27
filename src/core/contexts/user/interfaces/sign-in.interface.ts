import { UseFormReturn } from 'core/hooks/use-form/interfaces/use-form.interface';

import { ServiceRequest } from 'shared/types/service-request.type';

import { User } from 'features/auth/interfaces/user.interface';

export interface SignInParams {
  serviceRequest: ServiceRequest<User>;
  formFieldsObject: {
    [key: string]: string;
  };
  formFields: { [key: string]: UseFormReturn };
}
