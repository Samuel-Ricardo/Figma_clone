import { Point } from 'fabric';
import { ShapeType } from './type.type';
import { ActiveElement } from '@/@types/store/canvas/element/active.type';

export interface IShapeCreator {
  type: ShapeType | string | ActiveElement[];
  pointer: Point;
}

export interface IShapeFormCreator {
  pointer: Point;
  text?: string;
}
