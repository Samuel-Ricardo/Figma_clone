import { BasicTransformEvent, TPointerEvent } from 'fabric';
import { ICustomFabricObject } from '../../object.type';

export interface ICanvasObjectScaling {
  options: BasicTransformEvent<TPointerEvent> & { target: ICustomFabricObject };
}
