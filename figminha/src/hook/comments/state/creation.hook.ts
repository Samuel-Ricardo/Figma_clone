import {
  CreationCommentState,
  COMPLETED,
  PLACING,
  PLACED,
} from '@/@types/comment/state/creation.type';
import { useMemo, useState } from 'react';

export const useCommentCreationState = () => {
  const [creatingCommentState, setCreatingCommentState] =
    useState<CreationCommentState>(COMPLETED);

  const commentCreated = () => setCreatingCommentState(COMPLETED);
  const commentPlacing = () => setCreatingCommentState(PLACING);
  const commentPlaced = () => setCreatingCommentState(PLACED);

  const isCompleted = useMemo(
    () => creatingCommentState === COMPLETED,
    [creatingCommentState],
  );
  const isPlacing = useMemo(
    () => creatingCommentState === PLACING,
    [creatingCommentState],
  );
  const isPlaced = useMemo(
    () => creatingCommentState === PLACED,
    [creatingCommentState],
  );

  return {
    isCompleted,
    isPlacing,
    isPlaced,
    commentCreated,
    commentPlacing,
    commentPlaced,
  };
};
