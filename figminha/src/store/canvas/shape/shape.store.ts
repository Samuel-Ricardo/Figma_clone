import { IShapeStore } from '@/@types/store/canvas/shape/shape.type';
import { create } from 'zustand';

export const useShapeStore = create<IShapeStore>(set => ({
  shapeRef: null,
  selectedShapeRef: null,

  setShapeRef: shapeRef => set({ shapeRef }),
  setSelectedShapeRef: selectedShapeRef => set({ selectedShapeRef }),

  clearShapeRef: () => set({ shapeRef: null }),
  clearSelectedShapeRef: () => set({ selectedShapeRef: null }),

  clearAllShapeRefs: () => set({ shapeRef: null, selectedShapeRef: null }),
}));
