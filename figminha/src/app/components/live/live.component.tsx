'use client';

import { useOthers } from '@liveblocks/react';
import { LiveCursors } from './cursor/cursor.component';
import { useCursorPositionHandler } from '@/hook/cursor/state/handle/move.hook';
import { CursorChat } from '../chat/cursor.component';
import { CommentSystem } from '../comment/system.component';
import { useCursorStateHandleByKey } from '@/hook/cursor/state/handle/by/key.hook';
import { useEffect } from 'react';

export const Live = () => {
  const others = useOthers();
  
  const {
    cursor,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    onPointerEnter,
  } = useCursorPositionHandler();

  const { setupWindowKeyListeners, removeWindowKeyListeners } =
    useCursorStateHandleByKey({ message: null, cursor });

  useEffect(() => {
    setupWindowKeyListeners();
    return () => removeWindowKeyListeners();
  }, [setupWindowKeyListeners, removeWindowKeyListeners]);

  return (
    <div
      className="h-[100vh] w-full flex justify-center items-center text-center border-5 border-green-500"
      onPointerEnter={onPointerEnter}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
    >
      <h1 className="text-2xl text-white">Hello World</h1>

      {cursor && <CursorChat cursor={cursor} />}

      <CommentSystem />

      <LiveCursors others={others} />
    </div>
  );
};
