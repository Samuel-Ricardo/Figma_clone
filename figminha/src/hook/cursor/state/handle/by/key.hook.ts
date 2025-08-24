import { ICursorStateHandleByKey } from '@/@types/hook/cursor/state/handle/by/key.type';
import { useCursorState } from '@/store/cursor/cursor.store';
import { useMyPresence } from '@liveblocks/react';

//TODO: Improve - SRP (Single Responsibility Principle)
export const useCursorStateHandleByKey = ({
  message,
  cursor,
}: ICursorStateHandleByKey) => {
  const { setChatState, setHiddenState, setReactionSelectorState, setCommentState } =
    useCursorState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateMyPresence] = useMyPresence();

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      setChatState({ message: '', previousMessage: message });

    if (e.key === 'Escape') setHiddenState();
  };

  const handleWindowKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      case '/':
        setChatState({ message: '', previousMessage: message });
        break;

      case 'Escape':
        setHiddenState();
        updateMyPresence({ message: null });
        break;

      case 'e':
        setReactionSelectorState();
        break;

      case 'c':
      case 'C':
        if (cursor) {
          setCommentState(cursor.x, cursor.y);
        }
        break;
    }
  };

  const handleWindowKeyDown = (e: KeyboardEvent) => {
    if (e.key === '/') e.preventDefault();
    if (e.key === 'c' || e.key === 'C') e.preventDefault();
  };

  const setupWindowKeyListeners = () => {
    window.addEventListener('keyup', handleWindowKeyUp);
    window.addEventListener('keydown', handleWindowKeyDown);
  };

  const removeWindowKeyListeners = () => {
    window.removeEventListener('keyup', handleWindowKeyUp);
    window.removeEventListener('keydown', handleWindowKeyDown);
  };

  return {
    handleInputKeyDown,
    setupWindowKeyListeners,
    removeWindowKeyListeners,
  };
};
