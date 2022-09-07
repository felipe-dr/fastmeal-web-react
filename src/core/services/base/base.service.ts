import config from 'core/constants/config.constant';

import { HttpResponse } from 'shared/interfaces/http-response.interface';

import HttpService from '../http/http.service';

export default abstract class BaseService<T> {
  protected readonly http: HttpService;

  protected readonly endpoint: string;

  constructor(private resourcePath: string) {
    this.http = new HttpService();
    this.endpoint = `${config.API_URL}${this.resourcePath}`;
  }

  public create(body: Partial<T>): Promise<HttpResponse<T>> {
    return this.http.post<T>(this.endpoint, body);
  }

  public getAll(): Promise<HttpResponse<T[]>> {
    return this.http.get<T[]>(this.endpoint);
  }

  public getById(id: string | number): Promise<HttpResponse<T>> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  public update(
    id: string | number,
    body: Partial<T>
  ): Promise<HttpResponse<T>> {
    return this.http.put<T>(`${this.endpoint}/${id}`, body);
  }

  public delete(id: string | number): Promise<HttpResponse<T>> {
    return this.http.delete<T>(`${this.endpoint}/${id}`);
  }
}
