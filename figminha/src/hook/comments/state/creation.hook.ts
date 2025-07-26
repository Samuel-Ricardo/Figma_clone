import {
  CreationCommentState,
  COMPLETED,
  PLACING,
  PLACED,
} from '@/@types/comment/state/creation.type';
import { useState } from 'react';

export const useCommentCreationState = () => {
  const [creatingCommentState, setCreatingCommentState] =
    useState<CreationCommentState>(COMPLETED);

  const commentCreated = () => setCreatingCommentState(COMPLETED);
  const commentPlacing = () => setCreatingCommentState(PLACING);
  const commentPlaced = () => setCreatingCommentState(PLACED);

  return {
    creatingCommentState,
    commentCreated,
    commentPlacing,
    commentPlaced,
  };
};
