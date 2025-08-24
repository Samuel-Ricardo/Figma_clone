import { ShapeType } from '@/@types/canvas/shape/type.type';
import { Object } from 'fabric';

export interface IShapeStore {
  shapeRef: React.MutableRefObject<Object | null> | null;
  selectedShapeRef: ShapeType | null;

  setShapeRef: (shape: React.MutableRefObject<Object | null> | null) => void;
  clearShapeRef: () => void;

  setSelectedShapeRef: (shape: string | null) => void;
  clearSelectedShapeRef: () => void;

  clearAllShapeRefs: () => void;
}
