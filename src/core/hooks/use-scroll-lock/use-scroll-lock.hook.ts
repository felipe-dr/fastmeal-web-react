import { useCallback } from 'react';

export default function useScrollLock() {
  const bodyElement: HTMLElement = document.body;
  const overflowHiddenClass = 'u-overflow-hidden';

  const lockScroll = useCallback(() => {
    bodyElement.classList.add(overflowHiddenClass);
  }, []);

  const unlockScroll = useCallback(() => {
    bodyElement.classList.remove(overflowHiddenClass);
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
}
