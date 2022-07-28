import { HttpResponse } from 'shared/interfaces/http-response.interface';

import { User } from 'features/auth/interfaces/user.interface';

import BaseService from '../base/base.service';

export default class AuthService extends BaseService<User> {
  private static classInstance: AuthService;

  private constructor() {
    super('users');
  }

  public static getInstance(): AuthService {
    this.classInstance = this.classInstance || new this();

    return this.classInstance;
  }

  public signIn(body: Partial<User>): Promise<HttpResponse<User>> {
    return this.http.post<User>(`${this.endpoint}/signin`, body);
  }
}
