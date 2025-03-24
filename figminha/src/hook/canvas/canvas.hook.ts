import { useCallback } from 'react';
import { useShape } from './shape/shape.hook';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { Canvas } from 'fabric';

export const useCanvas = () => {
  const { deleteShapeFromStorage } = useShape();
  const { fabricRef } = useFabricState();
  const { canvasRef } = useCanvasStore();
  const { stopDrawing, startDrawing } = useCanvasStore();
};
