import {
  COMPLETED,
  PLACED,
  PLACING
  CreationCommentState,
} from '@/@types/comment/state/creation.type';
import { useCallback } from 'react';
import { useCommentCreationState } from './state/creation.hook';
import { useComposerHandler } from './thread/composer/handler.hook';

export const useComments = () => {

  const {isPlaced} = useCommentCreationState();
  const { closeComposer, placeComposer } = useComposerHandler();

  const handleNewCommentClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (isPlaced) return closeComposer(event);

      placeComposer(event);
    },
    [isPlaced, closeComposer, placeComposer],
  );

  return {handleNewCommentClick}
};

