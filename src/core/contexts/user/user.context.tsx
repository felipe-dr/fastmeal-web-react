import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import localStorage from 'core/constants/local-storage.constant';
import { handleResponse } from 'core/hooks/use-form/use-form.hook';
import AuthService from 'core/services/auth/auth.service';
import {
  getItemLocalStorage,
  removeItemsLocalStorage,
  setItemLocalStorage,
} from 'core/utils/local-storage/local-storage.util';

import { User } from 'features/auth/interfaces/user.interface';

import { SignInParams } from './interfaces/sign-in.interface';
import {
  UserContextData,
  UserContextReturn,
  UserProviderProps,
} from './interfaces/user.interface';
import { SignUpParams } from './types/sign-up.type';

const UserContext = createContext<UserContextData>({} as UserContextData);

/**
 * Component responsible for providing the user context.
 *
 * @typedef {object} UserProviderProps
 * @property {ReactNode} children
 * @returns {JSX.Element}
 */
export default function UserProvider({
  children,
}: UserProviderProps): JSX.Element {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isAuthenticatedUser, setIsAuthenticatedUser] =
    useState<boolean>(false);

  const value = useMemo(
    () => ({
      userEmail,
      setUserEmail,
      isAuthenticatedUser,
      setIsAuthenticatedUser,
    }),
    [userEmail, isAuthenticatedUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/**
 * Hook that manages states for authentication and email, as well as offering
 * sign in, sign out and sign up functions.
 *
 * @returns {UserContextReturn}
 */
export function useUserContext(): UserContextReturn {
  if (useContext(UserContext) === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  const {
    userEmail,
    setUserEmail,
    isAuthenticatedUser,
    setIsAuthenticatedUser,
  } = useContext(UserContext);

  function handleAuth(userData: User): void {
    if (userData) {
      setUserEmail(userData.email);
      setIsAuthenticatedUser(true);
      setItemLocalStorage(localStorage.USER, JSON.stringify(userData));
    }
  }

  async function signIn({
    serviceRequest,
    formFieldsObject,
    formFields,
  }: SignInParams): Promise<boolean> {
    const authService = AuthService.getInstance();
    const response = await serviceRequest(authService.signIn(formFieldsObject));
    const isSuccessResponse = handleResponse({ response, formFields });

    if (isSuccessResponse) {
      const data = response.parseBody?.data;

      handleAuth(data as User);
    }

    return isSuccessResponse;
  }

  function signOut(): void {
    setUserEmail('');
    setIsAuthenticatedUser(false);
    removeItemsLocalStorage([localStorage.USER]);
    alert('Logoff efetuado com sucesso');
  }

  async function signUp({
    serviceRequest,
    formFieldsObject,
    formFields,
  }: SignUpParams): Promise<boolean> {
    const authService = AuthService.getInstance();
    const response = await serviceRequest(authService.create(formFieldsObject));
    const isSuccessResponse = handleResponse({ response, formFields });

    if (isSuccessResponse) {
      await signIn({
        serviceRequest,
        formFieldsObject,
        formFields,
      });
    }

    return isSuccessResponse;
  }

  function setUserEmailFromLocalStorage(): void {
    const userLocalStorage = getItemLocalStorage(localStorage.USER);

    if (userLocalStorage) {
      const { email } = JSON.parse(userLocalStorage) as User;
      setUserEmail(email);
      setIsAuthenticatedUser(true);
    }
  }

  useEffect(() => {
    setUserEmailFromLocalStorage();
  }, []);

  return { userEmail, isAuthenticatedUser, signIn, signOut, signUp };
}
