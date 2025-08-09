import { useComments } from '@/hook/comments/comment.hook';
import { useCommentCreationState } from '@/hook/comments/state/creation.hook';
import { useEffect } from 'react';

export const useCommentCreationSubscriber = () => {
  const { isCompleted, state: commentState } = useCommentCreationState();
  const { handleNewCommentClick } = useComments();

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
