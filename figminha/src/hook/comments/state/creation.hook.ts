import {
  COMPLETED,
  PLACING,
  PLACED,
} from '@/@types/comment/state/creation.type';
import { useCommentStore } from '@/store/comment/comment.store';
import { useMemo } from 'react';

export const useCommentCreationState = () => {
  const { setState, state } = useCommentStore();

  const commentCreated = () => setState(COMPLETED);
  const commentPlacing = () => setState(PLACING);
  const commentPlaced = () => setState(PLACED);

  const isCompleted = useMemo(() => state === COMPLETED, [state]);
  const isPlacing = useMemo(() => state === PLACING, [state]);
  const isPlaced = useMemo(() => state === PLACED, [state]);

  return {
    isCompleted,
    isPlacing,
    isPlaced,
    commentCreated,
    commentPlacing,
    commentPlaced,
  };
};
