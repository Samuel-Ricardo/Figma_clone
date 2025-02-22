import { IPosition } from '@/@types/position.type';

export interface IFloatingReactionProps {
  positition: IPosition;
  timestamp: number;
  reaction: string;
}
