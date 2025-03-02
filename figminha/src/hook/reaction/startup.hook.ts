import { REACTION } from '@/@types/props/cursor/mode.type';
import { IReactionEvent } from '@/@types/store/reaction.type';
import { useCursorPositionHandler } from '@/hook/cursor/state/handle/move.hook';
import { useCursorState } from '@/store/cursor/cursor.store';
import { useReactionState } from '@/store/reaction/reaction.store';
import { useBroadcastEvent, useEventListener } from '@liveblocks/react';
import { useCallback } from 'react';
import useInterval from '../time/interval.hook';

export const useReactionStartup = () => {
  const { addReaction, clearReactions, reaction } = useReactionState();
  const { state } = useCursorState();
  const { cursor } = useCursorPositionHandler();
  const broadcast = useBroadcastEvent();

  const sendReaction = useCallback(() => {
    if (!reaction || state.mode !== REACTION || !state.isPressed || !cursor)
      return;

    addReaction({
      position: { x: cursor.x, y: cursor.y },
      reaction,
    });

    broadcast({
      position: { x: cursor.x, y: cursor.y },
      reaction,
      timestamp: Date.now(),
    } as IReactionEvent);
  }, [addReaction, broadcast, cursor, reaction, state]);

  const receiveReaction = useCallback(
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ event }: any) => addReaction(event as IReactionEvent),
    [addReaction],
  );

  useInterval(clearReactions, 1000);
  useInterval(sendReaction, 100);
  useEventListener(receiveReaction);

  return {
    sendReaction,
    receiveReaction,
    clearReactions,
  };
};
