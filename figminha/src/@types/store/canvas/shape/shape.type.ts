import { ShapeType } from '@/@types/canvas/shape/type.type';
import { Object } from 'fabric';
import { ActiveElement } from '../element/active.type';

export interface IShapeStore {
  shapeRef: React.MutableRefObject<Object | null> | null;
  selectedShapeRef: ShapeType | string | ActiveElement[] | null;

  setShapeRef: (shape: React.MutableRefObject<Object | null> | null) => void;
  clearShapeRef: () => void;

  setSelectedShapeRef: (
    shape: string | ShapeType | ActiveElement[] | null,
  ) => void;
  clearSelectedShapeRef: () => void;

  clearAllShapeRefs: () => void;
}
