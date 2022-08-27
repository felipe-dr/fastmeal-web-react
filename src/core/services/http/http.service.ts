import localStorage from 'core/constants/local-storage';
import { getItemLocalStorage } from 'core/utils/local-storage/local-storage.util';

import { HttpResponse } from 'shared/interfaces/http-response.interface';

export default class HttpService {
  private headers = {};

  public post<T>(url: string, body: Partial<T>): Promise<HttpResponse<T>> {
    const requestObject = {
      method: 'POST',
      body: JSON.stringify(body),
    };
    this.headers = { 'Content-Type': 'application/json' };

    return this.request<T>(url, requestObject);
  }

  public get<T>(url: string): Promise<HttpResponse<T>> {
    const requestObject = {
      method: 'GET',
    };

    return this.request<T>(url, requestObject);
  }

  public put<T>(url: string, body: Partial<T>): Promise<HttpResponse<T>> {
    const requestObject = {
      method: 'PUT',
      body: JSON.stringify(body),
    };
    this.headers = { 'Content-Type': 'application/json' };

    return this.request<T>(url, requestObject);
  }

  public delete<T>(url: string): Promise<HttpResponse<T>> {
    const requestObject = {
      method: 'DELETE',
    };

    return this.request<T>(url, requestObject);
  }

  private async request<T>(
    url: string,
    requestObject: RequestInit
  ): Promise<HttpResponse<T>> {
    const request: RequestInit = requestObject;
    let response: HttpResponse<T>;

    this.authHeader();
    request.headers = this.headers;

    try {
      response = await fetch(url, request);
      response.parseBody = await response.json();
    } catch (error: unknown) {
      throw new Error(`log: HttpService - ${error}`);
    }

    return response;
  }

  private authHeader(): void {
    const userLocalStorage = getItemLocalStorage(localStorage.USER);
    const { accessToken } = userLocalStorage
      ? JSON.parse(userLocalStorage)
      : '';

    if (accessToken) {
      this.headers = {
        ...this.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  }
}
