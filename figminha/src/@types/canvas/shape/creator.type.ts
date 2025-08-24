import { Point } from 'fabric';
import { ShapeType } from './type.type';

export interface IShapeCreator {
  type: ShapeType;
  pointer: Point;
}

export interface IShapeFormCreator {
  pointer: Point;
  text?: string;
}
