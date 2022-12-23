import { ReactNode } from 'react';

import { Toast } from 'shared/components/toast/interfaces/toast.interface';
import { Positions } from 'shared/types/positions.type';

export interface ToastContextData {
  toasts: Toast[];
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

export interface ToastContextProps {
  position?: Positions;
}

export interface ToastContextReturn {
  ToastComponent: JSX.Element;
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
}
