import { IPosition } from '@/@types/position.type';

export interface IComposerStore {
  coordinates: IPosition;
  allowComposer: boolean;

  setCoordinates: (coordinates: IPosition) => void;
  setAllowComposer: (allowComposer: boolean) => void;
}
