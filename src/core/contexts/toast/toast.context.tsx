/* eslint-disable react/jsx-no-bind */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { Toast } from 'shared/components/toast/interfaces/toast.interface';
import ToastComponent from 'shared/components/toast/toast.component';

import {
  ToastContextData,
  ToastContextProps,
  ToastContextReturn,
  ToastProviderProps,
} from './interfaces/toast.interface';

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

/**
 * Component responsible for providing the toast context.
 *
 * @typedef {object} ToastProviderProps
 * @property {ReactNode} children
 * @returns {JSX.Element}
 */
export default function ToastProvider({
  children,
}: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(() => ({ toasts, setToasts }), [toasts]);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

/**
 * Hook that manages a list of toasts with auto delete timing, as well as
 * providing toast add and remove functions.
 *
 * @returns {ToastContextProps}
 */
export function useToastContext({
  position = 'top-right',
}: ToastContextProps): ToastContextReturn {
  if (useContext(ToastContext) === undefined) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }

  const { toasts, setToasts } = useContext(ToastContext);
  const [customToasts, setCustomToasts] = useState(toasts);

  const autoDeleteTime = 4000;

  function addToast(toast: Toast): void {
    setToasts([...toasts, toast]);
  }

  function removeToast(id: string): void {
    const customToastIndex = customToasts.findIndex(
      (customToast) => customToast.id === id
    );
    const toastIndex = toasts.findIndex((toast) => toast.id === id);

    customToasts.splice(customToastIndex, 1);
    toasts.splice(toastIndex, 1);
    setCustomToasts([...customToasts]);
  }

  useEffect(() => {
    setCustomToasts([...toasts]);
  }, [toasts]);

  useEffect(() => {
    const autoDeleteInterval = setInterval(() => {
      if (toasts.length && customToasts.length) {
        removeToast(toasts[0].id);
      }
    }, autoDeleteTime);

    return () => clearInterval(autoDeleteInterval);
  }, [toasts, autoDeleteTime, customToasts]);

  return {
    ToastComponent: (
      <ToastComponent
        position={position}
        toastList={customToasts}
        removeToast={removeToast}
      />
    ),
    addToast,
    removeToast,
  };
}
