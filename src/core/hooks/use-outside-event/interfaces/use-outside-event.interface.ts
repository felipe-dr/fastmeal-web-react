export interface UseOutsideEventProps {
  element: React.MutableRefObject<HTMLDivElement | null>;
  initialStateElement?: boolean;
}

export interface UseOutsideEventReturn {
  isActiveElement: boolean;
  showElement: () => void;
  hiddenElement: () => void;
}
