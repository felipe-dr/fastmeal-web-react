import { ReactNode } from 'react';

export interface NavbarContextData {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavbarContextProps extends Partial<NavbarContextData> {
  handleNavbar: () => void;
  closeNavbar: () => void;
}

export interface NavbarProviderProps {
  children: ReactNode;
}
