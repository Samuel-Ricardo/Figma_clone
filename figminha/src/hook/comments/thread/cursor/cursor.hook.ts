import { useThreadCursorStore } from '@/store/cursor/thread/cursor.store';

export const useNewThreadCursor = () => {
  const { setCoordinates, resetCursor } = useThreadCursorStore();

  const updatePosition = (e: MouseEvent) => {
    if (isCursorOutsideCanvas(e, getCanvasRect())) return resetCursor();

    setCoordinates({ x: e.clientX, y: e.clientY });
  };

  return { updatePosition };
};
