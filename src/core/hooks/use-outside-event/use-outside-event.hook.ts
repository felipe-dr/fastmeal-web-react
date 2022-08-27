import { useEffect, useState } from 'react';

import {
  UseOutsideEventProps,
  UseOutsideEventReturn,
} from './interfaces/use-outside-event.interface';

/**
 * Hook that manages if an element is in an active state and if it is and an
 * event is triggered outside its limits, then it will have its state as
 * deactivated.
 *
 * @typedef {object} UseOutsideEventProps
 * @property {React.MutableRefObject<HTMLDivElement | null>} element
 * @property {boolean} [initialStateElement]
 * @returns {UseOutsideEventReturn}
 */
export default function useOutsideEvent({
  element,
  initialStateElement = false,
}: UseOutsideEventProps): UseOutsideEventReturn {
  const [isActiveElement, setIsActiveElement] =
    useState<boolean>(initialStateElement);

  function showElement(): void {
    setIsActiveElement(true);
  }

  function hiddenElement(): void {
    setIsActiveElement(false);
  }

  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent) => {
      const currentElement = element?.current;

      if (
        currentElement !== null &&
        !currentElement.contains(target as Element)
      ) {
        setIsActiveElement(!isActiveElement);
      }
    };

    if (isActiveElement) {
      window.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [element, isActiveElement]);

  return { isActiveElement, showElement, hiddenElement };
}
