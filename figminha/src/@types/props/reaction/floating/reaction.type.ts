import { IPosition } from '@/@types/position.type';
import { Reaction } from '../reaction.type';

export interface IFloatingReactionProps {
  positition: IPosition;
  timestamp: number;
  reaction: Reaction;
}
