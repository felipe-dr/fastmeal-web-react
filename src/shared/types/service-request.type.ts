import { HttpResponse } from 'shared/interfaces/http-response.interface';

export type ServiceRequest<T> = (
  service: Promise<HttpResponse<T>>
) => Promise<HttpResponse<T>>;
