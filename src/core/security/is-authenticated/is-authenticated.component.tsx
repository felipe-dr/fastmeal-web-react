import { Navigate, Outlet } from 'react-router-dom';

import localStorageConstant from 'core/constants/local-storage.constant';
import { getItemLocalStorage } from 'core/utils/local-storage/local-storage.util';

export default function IsAuthenticatedComponent(): JSX.Element {
  const isAuthenticatedUser = getItemLocalStorage(localStorageConstant.USER);

  if (isAuthenticatedUser) {
    return <Outlet />;
  }

  return <Navigate to="/auth/signin" />;
}
