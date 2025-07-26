import { useRef } from 'react';

export const useMousePointer = () => {
  const lastPointerEvent = useRef<PointerEvent>();

  return { lastPointerEvent };
};
