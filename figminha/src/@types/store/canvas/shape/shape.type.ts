import { Object } from 'fabric';

export interface IShapeStore {
  shapeRef: React.MutableRefObject<Object | null> | null;
  selectedShapeRef: React.MutableRefObject<Object | null> | null;

  setShapeRef: (shape: React.MutableRefObject<Object | null> | null) => void;
  clearShapeRef: () => void;

  setSelectedShapeRef: (
    shape: React.MutableRefObject<Object | null> | null,
  ) => void;
  clearSelectedShapeRef: () => void;

  clearAllShapeRefs: () => void;
}
