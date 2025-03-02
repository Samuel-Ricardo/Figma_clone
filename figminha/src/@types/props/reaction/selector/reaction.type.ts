import { Reaction } from '../reaction.type';

export interface IReactionSelectorProps {
  onSelect?: (reaction: Reaction) => void;
}
