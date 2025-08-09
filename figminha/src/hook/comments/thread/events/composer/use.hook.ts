import { useEffect } from 'react';
import { useComposerHandler } from '../../composer/handler.hook';

export const useComposerAllowmentSubscriber = () => {
  const { allowComposerUse } = useComposerHandler();

  useEffect(() => {
    document.documentElement.addEventListener('pointerdown', allowComposerUse);

    return () => {
      document.documentElement.removeEventListener(
        'pointerdown',
        allowComposerUse,
      );
    };
  }, [allowComposerUse]);
};
