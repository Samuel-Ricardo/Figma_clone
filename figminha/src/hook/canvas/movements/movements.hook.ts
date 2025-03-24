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
};
