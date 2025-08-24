import { BasicTransformEvent, TPointerEvent } from 'fabric';
import { ICustomFabricObject } from '../../object.type';

export interface ICanvasObjectResize
  extends BasicTransformEvent<TPointerEvent> {
  target: ICustomFabricObject;
}
