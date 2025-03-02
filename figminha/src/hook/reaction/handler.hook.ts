import { Reaction } from '@/@types/props/reaction/reaction.type';
import { useCursorState } from '@/store/cursor/cursor.store';
import { useReactionState } from '@/store/reaction/reaction.store';
import { useCallback } from 'react';

export const useReactionHandler = () => {
  const { setReaction } = useReactionState();
  const { setReactionState } = useCursorState();

  const reactionHandler = useCallback(
    (reaction: Reaction) => {
      setReaction(reaction);
      setReactionState({ reaction });
    },
    [setReaction, setReactionState],
  );

  return {
    reactionHandler,
  };
};
