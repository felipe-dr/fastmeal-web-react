import { ReactNode } from 'react';

export interface NavbarContextData {
  showNavbar: boolean;
  setShowNavbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavbarContextReturn {
  showNavbar: boolean;
  handleNavbar: () => void;
  closeNavbar: () => void;
}

export interface NavbarProviderProps {
  children: ReactNode;
}
