import { useCursorState } from '@/store/cursor/cursor.store';
import { useMyPresence } from '@liveblocks/react';

export const useCursorChatTypeHander = () => {
  const { setChatState } = useCursorState();

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateMyPresence] = useMyPresence();

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({
      message: e.target.value,
    });
    setChatState({ message: e.target.value, previousMessage: null });
  };

  return { handleTyping };
};
