import { IPosition } from '../position.type';

export interface ICanvasDynamicZoom {
  zoom: number;
  delta: number;
  position: IPosition;
  min?: number;
  max?: number;
  step?: number;
}
