import { REACTION, REACTION_SELECTOR } from '@/@types/props/cursor/mode.type';
import { useMyPresenceHandler } from '@/hook/presence.hook';
import { useCursorState } from '@/store/cursor/cursor.store';
import { PointerEvent, useCallback } from 'react';

export const useCursorPointerHandler = () => {
  const { syncPresence, resetPresence } = useMyPresenceHandler();
  const { state, setHiddenState, setPressed } = useCursorState();

  //NOTE: use-cases
  const updateCursorPosition = (event: React.PointerEvent) => {
    event.preventDefault();
    if (state.mode !== REACTION_SELECTOR) syncPresence(event);
  };

  const clearState = () => {
    setHiddenState();
    resetPresence();
  };

  const pressReaction = (event: PointerEvent) => {
    event.stopPropagation();
    syncPresence(event);
    if (state.mode === REACTION || state.mode === REACTION_SELECTOR)
      setPressed(true);
  };

  const stopReaction = (event: PointerEvent) => {
    event.stopPropagation();
    if (state.mode !== REACTION) return;

    setPressed(false);
    setHiddenState();
  };

  // @ts-expect-error ts(2322)
  const startCursortTracking = event => syncPresence(event);

  //NOTE: abstraction interface layer
  const handlePointerMove = useCallback(updateCursorPosition, [
    updateCursorPosition,
  ]);
  const handlePointerLeave = useCallback(clearState, [clearState]);
  const handlePointerDown = useCallback(pressReaction, [pressReaction]);
  const handlePointerUp = useCallback(stopReaction, [stopReaction]);
  const handlePointerEnter = useCallback(startCursortTracking, [
    startCursortTracking,
  ]);

  return {
    handlePointerEnter,
    handlePointerMove,
    handlePointerLeave,
    handlePointerDown,
    handlePointerUp,
  };
};
