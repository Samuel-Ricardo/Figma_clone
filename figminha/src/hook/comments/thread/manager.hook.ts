import { useCallback, useEffect } from 'react';
import { useCommentCreationState } from '../state/creation.hook';
import { useComposerHandler } from './composer/handler.hook';

export const useThreadManager = () => {
  const {
    state: commentState,
    isCompleted,
    isPlaced,
  } = useCommentCreationState();

  const { closeComposer, placeComposer } = useComposerHandler();

  const handleNewCommentClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (isPlaced) return closeComposer(event);

      placeComposer(event);
    },
    [isPlaced, closeComposer, placeComposer],
  );

  useEffect(() => {
    if (isCompleted) return;

    document.documentElement.addEventListener('click', handleNewCommentClick);

    return () => {
      document.documentElement.removeEventListener(
        'click',
        handleNewCommentClick,
      );
    };
  }, [commentState, handleNewCommentClick, isCompleted]);
};
