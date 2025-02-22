import './button.style.scss';
import { IReactionSelectorButtonProps } from '@/@types/props/reaction/selector/button.type';

export const ReactionSelectorButton = ({
  onSelect,
  reaction,
}: IReactionSelectorButtonProps) => {
  return (
    <li
      className="reaction-selector--button"
      onPointerDown={() => onSelect(reaction)}
    >
      {reaction}
    </li>
  );
};
