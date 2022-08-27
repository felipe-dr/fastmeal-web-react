import { ReactNode } from 'react';

export interface BreakpointContextData {
  breakpoints: { [key: string]: boolean };
  setBreakpoints: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

export interface BreakpointContextReturn {
  breakpoints: { [key: string]: boolean };
  isMobile: boolean;
}

export interface BreakpointProviderProps {
  children: ReactNode;
}
