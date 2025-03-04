'use client';

import { useOthers } from '@liveblocks/react';
import { LiveCursors } from './cursor/cursor.component';
import { CursorChat } from '../chat/cursor.component';
import { useCursorStateHandleByKey } from '@/hook/cursor/state/handle/by/key.hook';
import { useEffect } from 'react';
import { useCursorPointerHandler } from '@/hook/cursor/pointer/handler.hook';
import { useMyPresenceHandler } from '@/hook/presence.hook';
import { FloatingReaction } from '../reaction/floating/floating.component';
import { useReactionState } from '@/store/reaction/reaction.store';
import { useCursorState } from '@/store/cursor/cursor.store';
import { REACTION, REACTION_SELECTOR } from '@/@types/props/cursor/mode.type';
import { ReactionSelector } from '../reaction/selector/selector.component';
import { Cursor } from '../cursor/cursor.component';
import { useReactionStartup } from '@/hook/reaction/startup.hook';
import { ContextMenu } from '../context/menu/menu.component';
import { ContextMenuTrigger } from '../context/menu/trigger/trigger.component';
import { ContextMenuContent } from '@radix-ui/react-context-menu';
import { useCanvasStore } from '@/store/canvas/canvas.store';

export const Live = () => {
  const others = useOthers();
  const { setupWindowKeyListeners, removeWindowKeyListeners } =
    useCursorStateHandleByKey({ message: null });

  const { reactions } = useReactionState();
  const { state } = useCursorState();
  const { canvasRef } = useCanvasStore();

  const { handlePointerLeave, handlePointerMove, handlePointerEnter } =
    useCursorPointerHandler();

  const { cursor } = useMyPresenceHandler();

  useEffect(() => {
    setupWindowKeyListeners();
    return () => removeWindowKeyListeners();
  }, [setupWindowKeyListeners, removeWindowKeyListeners]);

  useReactionStartup();
  return (
    <ContextMenu>
      <ContextMenuTrigger
        id="context-menu"
        className="bg-transparent h-[100vh] w-full flex justify-center items-center text-center border-5 border-green-500"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {cursor && (
          <Cursor color="black" position={{ x: cursor.x, y: cursor.y }} />
        )}

        <canvas id="canvas-board" ref={canvasRef} />

        {reactions.map(reaction => (
          <FloatingReaction
            key={reaction.timestamp}
            reaction={reaction.reaction}
            timestamp={reaction.timestamp}
            positition={reaction.position}
          />
        ))}

        {cursor && <CursorChat cursor={cursor} />}

        {(state.mode === REACTION_SELECTOR || state.mode === REACTION) &&
          cursor && <ReactionSelector />}

        <LiveCursors others={others} />
      </ContextMenuTrigger>

      <ContextMenuContent className="right-menu-content">
        : )
      </ContextMenuContent>

      <ContextMenuContent />
    </ContextMenu>
  );
};

/*
  const {
    cursor,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onPointerEnter,
  } = useCursorPositionHandler();
  */
