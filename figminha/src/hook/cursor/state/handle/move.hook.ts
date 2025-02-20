import { REACTION, REACTION_SELECTOR } from '@/@types/props/cursor/mode.type';
import { useCursorState } from '@/store/cursor/cursor.store';
import { useMyPresence } from '@liveblocks/react';

export const useCursorPositionHandler = () => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const { state, setHiddenState, setPressed } = useCursorState();

  const onPointerEnter = (event: React.PointerEvent) => {
    updateMyPresence({
      cursor: {
        x: event.clientX - event.currentTarget.getBoundingClientRect().x,
        y: event.clientY - event.currentTarget.getBoundingClientRect().y,
      },
    });
  };

  const onPointerMove = (event: React.PointerEvent) => {
    event.preventDefault();

    if (!cursor || state.mode !== REACTION_SELECTOR) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      updateMyPresence({
        cursor: { x, y },
      });
    }
  };

  const onPointerLeave = () => {
    setHiddenState();
    updateMyPresence({
      cursor: null,
      message: null,
    });
  };

  const onPointerDown = (event: React.PointerEvent) => {
    updateMyPresence({
      cursor: {
        x: event.clientX - event.currentTarget.getBoundingClientRect().x,
        y: event.clientY - event.currentTarget.getBoundingClientRect().y,
      },
    });

    if (state.mode === REACTION) setPressed(true);
  };

  const onPointerUp = () => {
    if (state.mode === REACTION) setPressed(false);
  };

  return {
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerEnter,
    cursor,
  };
};
