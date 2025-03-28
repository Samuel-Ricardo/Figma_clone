import { IClampTargetPosition } from '@/@types/canvas/target/position/clamp/clamp.type';
import { useRedo, useUndo } from '@liveblocks/react';
import { useCallback } from 'react';

export const useCanvasActions = () => {
  const undo = useUndo();
  const redo = useRedo();

  const clampTargetPositionX = useCallback(
    ({ canvas, target }: IClampTargetPosition) => {
      target.left = Math.max(
        0,
        Math.min(
          target.left,
          (canvas?.width || 0) - (target.getScaledWidth() || target.width || 0),
        ),
      );
    },
    [],
  );

  return {
    undo,
    redo,
    clampTargetPositionX,
    //    clampTargetPositionY,
  };
};
