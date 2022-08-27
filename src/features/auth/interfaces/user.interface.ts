import { BaseModel } from 'shared/interfaces/base-model.interface';

export interface User extends Partial<BaseModel> {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  accessToken: string;
}
