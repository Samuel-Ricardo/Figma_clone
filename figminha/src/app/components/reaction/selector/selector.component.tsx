'use client';
import './selector.style.scss';

import { IReactionSelectorProps } from '@/@types/props/reaction/selector/reaction.type';
import { ReactionSelectorButton } from './button/button.component';
import { MODULES } from '@/@modules/app.factory';
import { useMyPresenceHandler } from '@/hook/presence.hook';
import { useCursorPointerHandler } from '@/hook/cursor/pointer/handler.hook';

export const ReactionSelector = ({ onSelect }: IReactionSelectorProps) => {
  const { REACTIONS } = MODULES.INFRA.CONFIG.CONST();
  const { cursor } = useMyPresenceHandler();

  const { handlePointerDown, handlePointerUp } = useCursorPointerHandler();

  return (
    <ul
      className="reaction-selector--container"
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
      onPointerMove={e => e.stopPropagation()}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {REACTIONS.map(reaction => (
        <ReactionSelectorButton
          key={reaction}
          onSelect={onSelect}
          reaction={reaction}
        />
      ))}
    </ul>
  );
};
