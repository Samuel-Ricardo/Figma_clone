import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { Canvas } from 'fabric';

export interface IClampTargetPosition {
  target: ICustomFabricObject;
  canvas: Canvas;
}
