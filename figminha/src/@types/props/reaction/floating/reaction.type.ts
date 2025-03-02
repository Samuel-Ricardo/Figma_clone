import { IPosition } from '@/@types/position.type';
import { Reaction } from '../reaction.type';

export interface IFloatingReactionProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  key?: any;
  positition: IPosition;
  timestamp: number;
  reaction: Reaction;
}
