import { useCallback, useEffect } from 'react';
import { useShape } from './shape/shape.hook';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { Canvas } from 'fabric';
import { useCanvasMovements } from './movements/movements.hook';
import { useShapeCreator } from './shape/creator/shape.hook';

export const useCanvas = () => {
  const { deleteShapeFromStorage } = useShape();
  const { fabricRef } = useFabricState();
  const { canvasRef } = useCanvasStore();
  const { stopDrawing, startDrawing } = useCanvasStore();
  const {
    handleCanvaseMouseMove,
    handleCanvasMouseDown,
    handleCanvasMouseUp,
    handleCanvasObjectMovement,
    handleCanvasSelectionCreated,
    handleCanvasObjectScaling,
  } = useCanvasMovements();
  const { syncNewPath, syncNewTarget } = useShapeCreator();

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

  useEffect(() => {
    const canvas = initializeCanvas();

    canvas?.on('mouse:down', ({ e }) => handleCanvasMouseDown({ options: e }));
    canvas?.on('mouse:move', ({ e }) => handleCanvaseMouseMove({ options: e }));
    canvas?.on('mouse:up', () => handleCanvasMouseUp());

    canvas?.on('path:created', options => syncNewPath({ options }));

    canvas?.on('object:modified', options => syncNewTarget({ options }));
    canvas?.on('object:moving', options =>
      handleCanvasObjectMovement({ options }),
    );
    canvas?.on('object:scaling', options =>
      handleCanvasObjectScaling({ options }),
    );

    canvas?.on('selection:created', options =>
      handleCanvasSelectionCreated({ options }),
    );
  }, [
    initializeCanvas,
    handleCanvasMouseDown,
    handleCanvaseMouseMove,
    handleCanvasMouseUp,
    syncNewPath,
    syncNewTarget,
    handleCanvasObjectMovement,
    handleCanvasSelectionCreated,
    handleCanvasObjectScaling,
  ]);

  return { deleteElementHandler, stopDrawn, startDrawn, initializeCanvas };
};
