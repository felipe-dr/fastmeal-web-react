import { ReactNode } from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: React.HTMLInputTypeAttribute;
  children?: ReactNode;
  error?: string;
}
