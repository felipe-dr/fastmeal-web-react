import { ReactNode } from 'react';

import { SignUpParams } from '../types/sign-up.type';
import { SignInParams } from './sign-in.interface';

export interface UserContextData {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticatedUser: boolean;
  setIsAuthenticatedUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserContextReturn {
  userEmail: string;
  isAuthenticatedUser: boolean;
  signIn: ({
    serviceRequest,
    formFieldsObject,
    formFields,
  }: SignInParams) => Promise<boolean>;
  signOut: () => void;
  signUp: ({
    serviceRequest,
    formFieldsObject,
    formFields,
  }: SignUpParams) => Promise<boolean>;
}

export interface UserProviderProps {
  children: ReactNode;
}
