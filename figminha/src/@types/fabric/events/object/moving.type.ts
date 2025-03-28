import { BasicTransformEvent, TPointerEvent } from 'fabric';
import { ICustomFabricObject } from '../../object.type';

export interface ICanvasObjectMoving {
  options: BasicTransformEvent<TPointerEvent> & { target: ICustomFabricObject };
}
