import { IPosition } from '@/@types/position.type';
import { useComposerStore } from '@/store/composer/composer.store';
import { usePointerStore } from '@/store/pointer/pointer.store';
import { ComposerSubmitComment } from '@liveblocks/react-comments';
import { FormEvent, useCallback } from 'react';
import { useCommentThread } from '../thread.hook';
import { useComposerHandler } from './handler.hook';

export const useComposerForm = () => {
  const { coordinates } = useComposerStore();
  const { lastPointerEvent } = usePointerStore();
  const { newThread } = useCommentThread();
  const { resetComposerState } = useComposerHandler();

  const stopFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const getCanvasElement = () => document.querySelector('#canvas');

  const isReadyToSubmit = useCallback(
    () => Boolean(coordinates && lastPointerEvent && getCanvasElement()),
    [coordinates, lastPointerEvent],
  );

  const getRelativeCoordinates = useCallback((): IPosition => {
    const overlayPanel = getCanvasElement();
    if (!overlayPanel) return { x: 0, y: 0 };

    const { top, left } = overlayPanel.getBoundingClientRect();
    return { x: coordinates.x - left, y: coordinates.y - top };
  }, [coordinates.x, coordinates.y]);

  const submit = useCallback(
    ({ body }: ComposerSubmitComment, event: FormEvent<HTMLFormElement>) => {
      stopFormSubmission(event);
      if (!isReadyToSubmit()) return;

      newThread({ composer: { body }, position: getRelativeCoordinates() });
      resetComposerState();
    },
    [getRelativeCoordinates, isReadyToSubmit, newThread, resetComposerState],
  );

  return { submit };
};
