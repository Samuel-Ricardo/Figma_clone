import { useCommentCreationState } from '@/hook/comments/state/creation.hook';
import { useEffect } from 'react';

export const usePlacementCancelSubscriber = () => {
  const { isPlacing, commentCreated } = useCommentCreationState();

  const cancelComposerPlacement = () => {
    return (event: MouseEvent) => {
      if (!isPlacing) return;

      event.preventDefault();
      commentCreated();
    };
  };

  useEffect(() => {
    if (!isPlacing) return;

    document.documentElement.addEventListener(
      'contextmenu',
      cancelComposerPlacement(),
    );

    return () => {
      document.documentElement.removeEventListener(
        'contextmenu',
        cancelComposerPlacement(),
      );
    };
  });
};
