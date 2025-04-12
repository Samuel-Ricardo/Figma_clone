import { useEffect } from 'react';
import { useCanvas } from '../canvas.hook';
import { useCanvasMovements } from '../movements/movements.hook';
import { useShapeCreator } from '../shape/creator/shape.hook';

export const useCanvasGestures = () => {
  const { initializeCanvas } = useCanvas();
  const {
    handleCanvaseMouseMove,
    handleCanvasMouseDown,
    handleCanvasMouseUp,
    handleCanvasObjectMovement,
    handleCanvasSelectionCreated,
    handleCanvasObjectScaling,
    handleCanvasObjectResize,
    handleCanvasMouseWheel,
  } = useCanvasMovements();
  const { syncNewPath, syncNewTarget } = useShapeCreator();

  useEffect(() => {
    const canvas = initializeCanvas();

    canvas?.on('mouse:down', ({ e }) => handleCanvasMouseDown({ options: e }));
    canvas?.on('mouse:move', ({ e }) => handleCanvaseMouseMove({ options: e }));
    canvas?.on('mouse:up', handleCanvasMouseUp);
    canvas?.on('mouse:wheel', handleCanvasMouseWheel);

    canvas?.on('path:created', options => syncNewPath({ options }));

    canvas?.on('object:modified', options => syncNewTarget({ options }));
    canvas?.on('object:moving', options =>
      handleCanvasObjectMovement({ options }),
    );
    canvas?.on('object:scaling', options =>
      handleCanvasObjectScaling({ options }),
    );
    canvas?.on('object:resizing', handleCanvasObjectResize);

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
    handleCanvasObjectResize,
    handleCanvasMouseWheel,
  ]);
};
