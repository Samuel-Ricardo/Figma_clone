import { useThreadCursorStore } from '@/store/cursor/thread/cursor.store';

export const useNewThreadCursor = () => {
  const { setCoordinates, resetCursor } = useThreadCursorStore();

  const getCanvasRect = () =>
    document.getElementById('canvas')?.getBoundingClientRect();

  const isCursorOutsideCanvas = (e: MouseEvent, rect?: DOMRect) =>
    rect &&
    (e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom);

  const updatePosition = (e: MouseEvent) => {
    if (isCursorOutsideCanvas(e, getCanvasRect())) return resetCursor();

    setCoordinates({ x: e.clientX, y: e.clientY });
  };

  return { updatePosition };
};
