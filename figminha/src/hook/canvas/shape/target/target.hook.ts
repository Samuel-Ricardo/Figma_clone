import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { useShapeStore } from '@/store/canvas/shape/shape.store';
import { FabricObject } from 'fabric';
import { useCallback } from 'react';
import { useCanvas } from '../../canvas.hook';

export const useShapeTarget = () => {
  const { stopDrawn } = useCanvas();
  const { selectedShapeRef } = useShapeStore();
  const { fabricRef } = useFabricState();

  const isTargetTheSelectedShape = useCallback(
    (target: FabricObject | undefined) =>
      target && target.type === selectedShapeRef,
    [selectedShapeRef],
  );
};
