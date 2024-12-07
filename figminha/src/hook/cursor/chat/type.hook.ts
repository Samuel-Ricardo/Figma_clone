import { useCursorState } from '@/store/cursor/cursor.store';
import { useMyPresence } from '@liveblocks/react';
import { useCallback } from 'react';

export const useCursorChatTypeHander = () => {
  const { setChatState } = useCursorState();

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateMyPresence] = useMyPresence();

  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateMyPresence({
        message: e.target.value,
      });
      setChatState({ message: e.target.value, previousMessage: null });
    },
    [setChatState, updateMyPresence],
  );

  return { handleTyping };
};
