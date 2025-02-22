import './selector.style.scss';

import { IReactionSelectorProps } from '@/@types/props/reaction/selector/reaction.type';
import { ReactionSelectorButton } from './button/button.component';
import { MODULES } from '@/@modules/app.factory';

export const ReactionSelector = ({ onSelect }: IReactionSelectorProps) => {
  const { REACTIONS } = MODULES.INFRA.CONFIG.CONST();

  return (
    <ul
      className="reaction-selector--container"
      onPointerMove={e => e.stopPropagation()}
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
