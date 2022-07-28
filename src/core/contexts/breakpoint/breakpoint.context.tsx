import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import appBreakpoints from 'core/constants/breakpoints';

import {
  BreakpointContextData,
  BreakpointContextProps,
  BreakpointProviderProps,
} from './interfaces/breakpoint.interface';

const BreakpointContext = createContext<BreakpointContextData>(
  {} as BreakpointContextData
);

/**
 * Component responsible for providing the breakpoint context.
 *
 * @param {ReactNode} children
 * @returns {JSX.Element}
 */
export default function BreakpointProvider({
  children,
}: BreakpointProviderProps): JSX.Element {
  const [breakpoints, setBreakpoints] = useState({});
  const value = useMemo(() => ({ breakpoints, setBreakpoints }), [breakpoints]);

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
}

/**
 * Hook that updates a custom breakpoint list with logical value, as there
 * is or no longer a match between this list and the predefined list of
 * media queries.
 *
 * @returns {BreakpointContextProps}
 */
export function useBreakpointContext(): BreakpointContextProps {
  if (useContext(BreakpointContext) === undefined) {
    throw new Error(
      'useBreakpointContext must be used within BreakpointProvider'
    );
  }

  const { breakpoints, setBreakpoints } = useContext(BreakpointContext);
  const isMobile: boolean = breakpoints.MD;
  const inputBreakpoints: { [key: string]: string } = appBreakpoints;

  useEffect(() => {
    const mediaQueryList: { [key: string]: MediaQueryList } = {};
    const inputBreakpointKeys: string[] = Object.keys(inputBreakpoints);
    let isAttached = false;

    const handleQueryListener = () => {
      const updatedMatches = inputBreakpointKeys.reduce(
        (acc: { [key: string]: boolean }, media: string) => {
          acc[media] = !!(
            mediaQueryList[media] && mediaQueryList[media].matches
          );
          return acc;
        },
        {}
      );
      setBreakpoints(updatedMatches);
    };

    if (window && window.matchMedia) {
      const matches: { [key: string]: boolean } = {};

      inputBreakpointKeys.forEach((media: string) => {
        if (typeof inputBreakpoints[media] === 'string') {
          mediaQueryList[media] = window.matchMedia(inputBreakpoints[media]);
          matches[media] = mediaQueryList[media].matches;
        } else {
          matches[media] = false;
        }
      });
      setBreakpoints(matches);
      isAttached = true;

      inputBreakpointKeys.forEach((media: string) => {
        if (typeof inputBreakpoints[media] === 'string') {
          mediaQueryList[media].addEventListener('change', handleQueryListener);
        }
      });
    }

    return () => {
      if (isAttached) {
        inputBreakpointKeys.forEach((media: string) => {
          if (typeof inputBreakpoints[media] === 'string') {
            mediaQueryList[media].removeEventListener(
              'change',
              handleQueryListener
            );
          }
        });
      }
    };
  }, [inputBreakpoints]);

  return { breakpoints, isMobile };
}
