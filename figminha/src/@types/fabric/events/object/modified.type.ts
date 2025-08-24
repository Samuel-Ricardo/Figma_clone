import { ModifiedEvent, TPointerEvent } from 'fabric';

export interface ICanvasObjectModified {
  options: ModifiedEvent<TPointerEvent>;
}
