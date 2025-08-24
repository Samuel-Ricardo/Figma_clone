import { IPosition } from '@/@types/position.type';

export interface INewThreadCursorStore {
  coordinates: IPosition;
  setCoordinates: (coordinates: IPosition) => void;
  resetCursor: () => void;
}
