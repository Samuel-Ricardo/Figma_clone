import { Reaction } from '../reaction.type';
import { IReactionSelectorProps } from './reaction.type';

export interface IReactionSelectorButtonProps extends IReactionSelectorProps {
  reaction: Reaction;
}
