import { ICursorStateHandleByKey } from '@/@types/hook/cursor/state/handle/by/key.type';
import { useCursorState } from '@/store/cursor/cursor.store';
import { useCallback } from 'react';

export const useCursorStateHandleByKey = ({
  message,
}: ICursorStateHandleByKey) => {
  const { setChatState, setHiddenState } = useCursorState();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter')
        setChatState({ message: '', previousMessage: message });

      if (e.key === 'Escape') setHiddenState();
    },
    [message, setChatState, setHiddenState],
  );

  return { handleKeyDown };
};
