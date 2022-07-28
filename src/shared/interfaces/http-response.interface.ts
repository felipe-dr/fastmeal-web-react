export interface HttpResponse<T> extends Response {
  parseBody?: {
    success: boolean;
    statusCode: number;
    statusMessage?: string;
    data?: T;
    errors?: [];
  };
}
