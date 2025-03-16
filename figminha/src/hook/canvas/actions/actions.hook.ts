import { useRedo, useUndo } from '@liveblocks/react';

export const useCanvasActions = () => {
  const undo = useUndo();
  const redo = useRedo();

  return {
    undo,
    redo,
  };
};
