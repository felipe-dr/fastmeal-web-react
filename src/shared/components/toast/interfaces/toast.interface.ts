import { ReactNode } from 'react';

import { Alerts } from 'shared/types/alerts.type';
import { Positions } from 'shared/types/positions.type';

export interface Toast {
  id: string;
  type?: Alerts;
  icon?: ReactNode;
  title?: string;
  message: string;
}

export interface ToastProps {
  position: Positions;
  toastList: Toast[];
  removeToast: (id: string) => void;
}
