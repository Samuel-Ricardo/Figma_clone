import { useNewThreadCursor } from '@/hook/comments/thread/cursor/cursor.hook';

export const useNewThreadCursorUpdateListener = () => {
  const { updatePosition } = useNewThreadCursor();

  const listner = () => {
    document.addEventListener('mousemove', updatePosition, false);
    document.addEventListener('mouseenter', updatePosition, false);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', updatePosition);
    };
  };

  return {
    listner,
  };
};
