import { useActiveElementStore } from '@/store/canvas/element/active.store';
import { useCallback } from 'react';
import { useShape } from '../shape/shape.hook';
import { useCanvas } from '../canvas.hook';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { IElement } from '@/@types/store/canvas/element/active.type';
import { useShapeStore } from '@/store/canvas/shape/shape.store';

export const useActiveElement = () => {
  const { clearElement, resetDefault, setElement } = useActiveElementStore();
  const { deleteAllShapes } = useShape();
  const { setSelectedShapeRef } = useShapeStore();
  const { deleteElementHandler, stopDrawn } = useCanvas();
  const { imageInputRef } = useCanvasStore();

  const resetElement = useCallback(() => {
    deleteAllShapes();
    clearElement();
    resetDefault();
  }, [deleteAllShapes, clearElement, resetDefault]);

  const deleteElement = useCallback(() => {
    deleteElementHandler();
    resetDefault();
  }, [deleteElementHandler, resetDefault]);

  const initImageUpload = useCallback(() => {
    imageInputRef?.current?.click();
    stopDrawn();
  }, [imageInputRef, stopDrawn]);
};
