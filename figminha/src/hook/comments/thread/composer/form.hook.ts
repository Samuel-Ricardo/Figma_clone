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
};
