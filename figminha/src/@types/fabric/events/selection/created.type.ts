import { TEvent, TPointerEvent } from 'fabric';
import { ICustomFabricObject } from '../../object.type';

export interface ICanvasSelectionCreated {
  options: Partial<TEvent<TPointerEvent>> & { selected: ICustomFabricObject[] };
}
