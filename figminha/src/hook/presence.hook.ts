import { getCursorPosition } from '@/utils/cursor.utils';
import { useMyPresence } from '@liveblocks/react';
import { useCallback } from 'react';

export const useMyPresenceHandler = () => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const syncPresence = useCallback(
    (event: React.PointerEvent) => {
      const { x, y } = getCursorPosition(event);
      updateMyPresence({
        cursor: { x, y },
      });
    },
    [updateMyPresence],
  );

  const resetPresence = () => {
    updateMyPresence({
      cursor: null,
      message: null,
    });
  };

  return {
    syncPresence,
    resetPresence,
    cursor,
  };
};
