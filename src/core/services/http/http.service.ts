/* eslint-disable class-methods-use-this */
import { HttpResponse } from 'shared/interfaces/http-response.interface';

export default class HttpService {
  public post<T>(url: string, body: Partial<T>): Promise<HttpResponse<T>> {
    const requestObject = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

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
    let response!: HttpResponse<T>;

    try {
      response = await fetch(url, requestObject);
      response.parseBody = await response.json();
    } catch (error: unknown) {
      throw new Error(`log: HttpService - ${error}`);
    }

    return response;
  }
}
