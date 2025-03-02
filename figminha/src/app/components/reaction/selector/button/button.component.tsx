'use client';

import { useReactionHandler } from '@/hook/reaction/handler.hook';
import './button.style.scss';
import { IReactionSelectorButtonProps } from '@/@types/props/reaction/selector/button.type';

export const ReactionSelectorButton = ({
  reaction,
}: IReactionSelectorButtonProps) => {
  const { reactionHandler } = useReactionHandler();

  return (
    <li
      className="reaction-selector--button"
      onPointerDown={() => reactionHandler(reaction)}
    >
      {reaction}
    </li>
  );
};
