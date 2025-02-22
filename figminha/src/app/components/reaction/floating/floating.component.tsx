import './floating.style.scss';
import style from './floating.animation.module.scss';

import { IFloatingReactionProps } from '@/@types/props/reaction/floating/reaction.type';

export const FloatingReaction = ({
  positition: { x, y },
  reaction,
  timestamp,
}: IFloatingReactionProps) => {
  const animation = style;
  return (
    <div
      className={`floating-reaction--container ${animation.disappear} text-${(timestamp % 5) + 2}xl ${animation['goUp' + (timestamp % 3)]}`}
      style={{ left: x, top: y }}
    >
      <div className={animation['leftRight' + (timestamp % 3)]}>
        <div className="floating-reaction--reaction">{reaction}</div>
      </div>
    </div>
  );
};
