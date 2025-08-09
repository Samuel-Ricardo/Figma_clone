import { useComposerClick } from '@/hook/mouse/click/composer.hook';
import { useEffect } from 'react';

export const usePointerMoveSubscriber = () => {
  const { savePointerEvent } = useComposerClick();

  useEffect(() => {
    document.documentElement.addEventListener('pointermove', savePointerEvent);

    return () => {
      document.documentElement.removeEventListener(
        'pointermove',
        savePointerEvent,
      );
    };
  }, [savePointerEvent]);
};
