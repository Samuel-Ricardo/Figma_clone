import { useCallback } from 'react';
import { useShape } from './shape/shape.hook';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { Canvas, Object, Point, util } from 'fabric';
import { ICanvasDynamicZoom } from '@/@types/canvas/zoom.type';
import { v4 as uuidv4 } from 'uuid';
import { useUndo, useRedo } from '../../../liveblocks.config';

export const useCanvas = () => {
  const { syncShapeInStorage, deleteShapeFromStorage } = useShape();
  const { fabricRef } = useFabricState();
  const { canvasRef, setClipboard, getClipboard, canvasObjects } =
    useCanvasStore();
  const { stopDrawing, startDrawing, activeObjectRef } = useCanvasStore();

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

  const copy = useCallback(() => {
    if (!fabricRef?.current) return [];

    const activeObjects = fabricRef.current.getActiveObjects();
    if (activeObjects.length <= 0) return activeObjects;

    const serializedObjects = activeObjects?.map(obj => obj.toObject());
    setClipboard(serializedObjects);

    return activeObjects;
  }, [fabricRef, setClipboard]);

  const offsetToAvoidOverlaps = useCallback(
    (enlivenedObject: Object) => {
      enlivenedObject.set({
        left: enlivenedObject.left || 0 + 20,
        top: enlivenedObject.top || 0 + 20,
        objectId: uuidv4(),
        fill: '#aabbcc',
      } as ICustomFabricObject);

      fabricRef?.current?.add(enlivenedObject);
      syncShapeInStorage(enlivenedObject);
    },
    [fabricRef, syncShapeInStorage],
  );

  const deserialize = useCallback(
    (obj: Object) => {
      util.enlivenObjects([obj], {
        signal: new AbortController().signal,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        reviver: (enlivenedObjects, _instance) => {
          enlivenedObjects.forEach(offsetToAvoidOverlaps);
          fabricRef?.current?.renderAll();
        },
      });
    },
    [fabricRef, offsetToAvoidOverlaps],
  );

  const paste = useCallback(() => {
    if (!fabricRef?.current)
      return console.error('Invalid Canvas Object. Aborting Paste Operation.');

    const clipboard = getClipboard();
    if (!clipboard)
      return console.log('No Clipboard. Aborting Paste Operation.');

    clipboard.forEach(deserialize);
  }, [deserialize, fabricRef, getClipboard]);

  const deleteShape = useCallback(() => {
    fabricRef?.current
      ?.getActiveObjects()
      .forEach((obj: ICustomFabricObject) => {
        if (!obj.objectId) return;
        fabricRef?.current?.remove(obj);
        deleteShapeFromStorage(obj.objectId);
      });

    fabricRef?.current?.discardActiveObject();
    fabricRef?.current?.renderAll();
  }, [fabricRef, deleteShapeFromStorage]);

  const cut = useCallback(() => {
    const activeObjects = copy();
    deleteShape();
    return activeObjects;
  }, [copy, deleteShape]);

  const undo = useUndo;
  const redo = useRedo;

  const createCorrectCanvasInstacesForEachObject = useCallback(() => {
    if (!canvasObjects) return console.log('Error: ', { canvasObjects });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Array.from(canvasObjects, ([_objectId, objectData], _number) => {
      util.enlivenObjects([objectData], {
        signal: new AbortController().signal,
        reviver: enlivedObjects => {
          enlivedObjects.forEach((enlivenedObject: Object) => {
            console.log({ enlivenedObject });
            if (
              JSON.stringify(activeObjectRef?.current) ===
              JSON.stringify(objectData)
            )
              fabricRef?.current?.setActiveObject(enlivenedObject);

            fabricRef?.current?.add(enlivenedObject);
          });
        },
      });
    });
  }, [canvasObjects, fabricRef, activeObjectRef]);

  const render = useCallback(() => {
    fabricRef?.current?.clear();
    createCorrectCanvasInstacesForEachObject();
    fabricRef?.current?.renderAll();
  }, [fabricRef, createCorrectCanvasInstacesForEachObject]);

  return {
    deleteElementHandler,
    stopDrawn,
    startDrawn,
    initializeCanvas,
    dynamicZoom,
    resize,
    copy,
    paste,
    deleteShape,
    cut,
    undo,
    redo,
    render,
  };
};
