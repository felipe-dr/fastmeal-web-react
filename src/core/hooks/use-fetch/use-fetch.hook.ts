import { useCallback, useState } from 'react';

import { HttpResponse } from 'shared/interfaces/http-response.interface';

import { UseFetchReturn } from './interfaces/use-fetch.interface';

/**
 * Hook that receives an already defined service type, returning the states:
 * statusMessage, data, isLoading, errors.
 *
 * @returns {UseFetchReturn}
 */
export default function useFetch<T>(): UseFetchReturn<T> {
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<[]>([]);

  const request = useCallback(async (service: Promise<HttpResponse<T>>) => {
    let response!: HttpResponse<T>;
    let isSuccessResponse!: boolean;
    let responseMessage!: string;
    let responseData!: T | null;
    let responseErrors!: [];

    try {
      setStatusMessage('');
      setIsLoading(true);
      setErrors([]);
      response = await service;
      const { parseBody } = response;
      isSuccessResponse = parseBody?.success || false;
      responseMessage = parseBody?.statusMessage || '';
      responseData = parseBody?.data || null;
      responseErrors = parseBody?.errors || [];

      if (!isSuccessResponse) {
        setErrors(responseErrors);
      }
    } catch (error: unknown) {
      throw new Error(`log: useFetch - ${error}`);
    } finally {
      setStatusMessage(responseMessage);
      setData(responseData);
      setIsLoading(false);
    }

    return response;
  }, []);

  return { request, statusMessage, data, isLoading, errors };
}
