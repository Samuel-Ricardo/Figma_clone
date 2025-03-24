import { useCanvas } from '../canvas.hook';
import { useShapeStore } from '@/store/canvas/shape/shape.store';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { useCallback } from 'react';
import { useShapeCreator } from '../shape/creator/shape.hook';
import { ICanvasMouseDown } from '@/@types/fabric/events/move/down.type';
import { useShapeTarget } from '../shape/target/target.hook';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { useShape } from '../shape/shape.hook';
import { useActiveElementStore } from '@/store/canvas/element/active.store';

export const useCanvasMovements = () => {
  const { stopDrawn, startDrawn } = useCanvas();
  const { isDrawing, activeObjectRef } = useCanvasStore();
  const { shapeRef, selectedShapeRef, setSelectedShapeRef } = useShapeStore();
  const { newShapeFromPoint } = useShapeCreator();
  const { syncShapeInStorage } = useShape();
  const { fabricRef } = useFabricState();
  const { resetDefault } = useActiveElementStore();

  const { setupTarget, isTargetTheActiveSelection, isTargetTheSelectedShape } =
    useShapeTarget();

  const handleCanvasMouseDown = useCallback(
    ({ options }: ICanvasMouseDown) => {
      if (!fabricRef?.current) return;

      const pointer = fabricRef.current.getPointer(options);
      const target = fabricRef.current.findTarget(options);

      stopDrawn();
      if (selectedShapeRef === 'freeform') return startDrawn();

      if (
        isTargetTheSelectedShape(target) ||
        isTargetTheActiveSelection(target)
      ) {
        setupTarget(target!);
      } else {
        newShapeFromPoint(pointer);
      }

      if (shapeRef?.current) fabricRef.current.add(shapeRef.current);
    },
    [
      fabricRef,
      newShapeFromPoint,
      setupTarget,
      selectedShapeRef,
      shapeRef,
      stopDrawn,
      startDrawn,
      isTargetTheSelectedShape,
      isTargetTheActiveSelection,
    ],
  );

  const handleCanvaseMouseMove = useCallback(
    ({ options }: ICanvasMouseDown) => {
      if (!isDrawing || selectedShapeRef === 'freeform') return;
      stopDrawn();

      const pointer = fabricRef?.current?.getPointer(options);
      if (!pointer) return;

      switch (selectedShapeRef) {
        case 'rectangle':
          shapeRef?.current?.set({
            width: pointer.x - (shapeRef.current?.left || 0),
            height: pointer.y - (shapeRef.current?.top || 0),
          });
          break;

        case 'circle':
          shapeRef?.current?.set({
            radius: Math.abs(pointer.x - (shapeRef.current?.left || 0)) / 2,
          });
          break;

        case 'triangle':
          shapeRef?.current?.set({
            width: pointer.x - (shapeRef.current?.left || 0),
            height: pointer.y - (shapeRef.current?.top || 0),
          });
          break;

        case 'line':
          shapeRef?.current?.set({
            x2: pointer.x,
            y2: pointer.y,
          });
          break;

        case 'image':
          shapeRef?.current?.set({
            width: pointer.x - (shapeRef.current?.left || 0),
            height: pointer.y - (shapeRef.current?.top || 0),
          });

        default:
          break;
      }

      fabricRef?.current?.renderAll();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((shapeRef?.current as any).objectId)
        syncShapeInStorage(shapeRef?.current);
    },
    [
      fabricRef,
      isDrawing,
      selectedShapeRef,
      shapeRef,
      stopDrawn,
      syncShapeInStorage,
    ],
  );

  const resetAll = useCallback(() => {
    shapeRef!.current = null;
    activeObjectRef!.current = null;
    setSelectedShapeRef(null);

    if (!fabricRef?.current?.isDrawingMode) setTimeout(resetDefault, 700);
  }, [fabricRef, resetDefault, setSelectedShapeRef, shapeRef, activeObjectRef]);

  const handleCanvasMouseUp = useCallback(() => {
    if (selectedShapeRef === 'freeform') return;

    syncShapeInStorage(shapeRef?.current);
    resetAll();
  }, [resetAll, selectedShapeRef, shapeRef, syncShapeInStorage]);

  return {
    handleCanvasMouseDown,
    handleCanvaseMouseMove,
    handleCanvasMouseUp,
  };
};
