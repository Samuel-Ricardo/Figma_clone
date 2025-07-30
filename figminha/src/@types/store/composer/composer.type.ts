import { IPosition } from '@/@types/position.type';

export interface IComposerStore {
  coordinates: IPosition;

  setCoordinates: (coordinates: IPosition) => void;
}
