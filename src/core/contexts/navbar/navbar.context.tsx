import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import useScrollLock from 'core/hooks/use-scroll-lock/use-scroll-lock.hook';

import {
  NavbarContextData,
  NavbarContextReturn,
  NavbarProviderProps,
} from './interfaces/navbar.interface';

const NavbarContext = createContext<NavbarContextData>({} as NavbarContextData);

/**
 * Component responsible for providing the navbar context.
 *
 * @typedef {object} NavbarProviderProps
 * @property {ReactNode} children
 * @returns {JSX.Element}
 */
export default function NavbarProvider({
  children,
}: NavbarProviderProps): JSX.Element {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const value = useMemo(() => ({ showNavbar, setShowNavbar }), [showNavbar]);

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}

/**
 * Hook that manages the navbar's view state, as well as adding or removing a
 * style class to the body element depending on the navbar's current state.
 * This is done to prevent the page from scrolling while the navigation bar is
 * active.
 *
 * @returns {NavbarContextReturn}
 */
export function useNavbarContext(): NavbarContextReturn {
  if (useContext(NavbarContext) === undefined) {
    throw new Error('useNavbarContext must be used within a NavbarProvider');
  }

  const { showNavbar, setShowNavbar } = useContext(NavbarContext);
  const { lockScroll, unlockScroll } = useScrollLock();

  function handleNavbar(): void {
    setShowNavbar(!showNavbar);
  }

  function closeNavbar(): void {
    setShowNavbar(false);
  }

  useEffect(() => {
    if (showNavbar) {
      lockScroll();
    }

    return () => unlockScroll();
  }, [showNavbar]);

  return { showNavbar, handleNavbar, closeNavbar };
}
