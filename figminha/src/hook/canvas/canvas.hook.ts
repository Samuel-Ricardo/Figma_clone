import { useCallback } from 'react';
import { useShape } from './shape/shape.hook';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { Canvas, Point } from 'fabric';
import { ICanvasDynamicZoom } from '@/@types/canvas/zoom.type';

export const useCanvas = () => {
  const { deleteShapeFromStorage } = useShape();
  const { fabricRef } = useFabricState();
  const { canvasRef } = useCanvasStore();
  const { stopDrawing, startDrawing } = useCanvasStore();

  const deleteElementHandler = useCallback(() => {
    const activeObjects = fabricRef?.current?.getObjects();
    if (!activeObjects || activeObjects.length <= 0) return;

    activeObjects.forEach((obj: ICustomFabricObject) => {
      if (!obj.objectId) return;
      fabricRef?.current?.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    });

    fabricRef?.current?.discardActiveObject();
    fabricRef?.current?.requestRenderAll();
  }, [fabricRef, deleteShapeFromStorage]);

  const stopDrawn = () => {
    stopDrawing();
    if (fabricRef?.current) fabricRef.current.isDrawingMode = false;
  };

  const startDrawn = () => {
    startDrawing();
    if (fabricRef?.current) fabricRef.current.isDrawingMode = true;
    if (fabricRef?.current?.freeDrawingBrush)
      fabricRef.current.freeDrawingBrush.width = 5;
  };

  const initializeCanvas = useCallback(() => {
    if (!canvasRef?.current) return;
    const canvasElement = document.getElementById(
      'canvas-board',
    ) as HTMLCanvasElement;
    if (!canvasElement) return;

    const canvas = new Canvas(canvasRef.current, {
      width: canvasElement.width,
      height: canvasElement.height,
    });

    if (fabricRef?.current) fabricRef.current = canvas;
    //setFabricRef(fabricRef);

    return canvas;
  }, [canvasRef, fabricRef]);

  const dynamicZoom = useCallback(
    ({
      delta,
      position,
      zoom,
      min = 0.2,
      max = 1,
      step = 0.001,
    }: ICanvasDynamicZoom) =>
      fabricRef?.current?.zoomToPoint(
        new Point(position.x, position.y),
        Math.min(Math.max(min, zoom + delta * step), max),
      ),
    [fabricRef],
  );

  const resize = useCallback(
    () =>
      fabricRef?.current?.setDimensions({
        width: canvasRef?.current?.clientWidth,
        height: canvasRef?.current?.clientHeight,
      }),
    [fabricRef, canvasRef],
  );

  return {
    deleteElementHandler,
    stopDrawn,
    startDrawn,
    initializeCanvas,
    dynamicZoom,
    resize,
  };
};
