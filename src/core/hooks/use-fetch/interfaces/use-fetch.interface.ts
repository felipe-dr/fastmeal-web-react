import { ServiceRequest } from 'shared/types/service-request.type';

export interface UseFetchReturn<T> {
  request: ServiceRequest<T>;
  statusMessage: string;
  data: T | null;
  isLoading: boolean;
  errors: [];
}
