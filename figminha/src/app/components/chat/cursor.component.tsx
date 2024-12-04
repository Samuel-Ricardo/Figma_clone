'use client';

import { ICursorChatProps } from '@/@types/props/chat/cursor.type';
import { CHAT } from '@/@types/props/cursor/mode.type';
import { useCursorState } from '@/store/cursor/cursor.store';
import { BubbleChatInput } from './bubble/input.compent';

export const CursorChat = ({ cursor: { x, y } }: ICursorChatProps) => {
  const state = useCursorState();

  return (
    <div
      className="absolute top-0 left-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      {state.mode === CHAT && (
        <BubbleChatInput
          previousMessage={state.previousMessage}
          message={state.message}
        />
      )}
    </div>
  );
};
