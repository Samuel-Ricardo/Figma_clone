import { useMutation } from '../../../../liveblocks.config';

export const useShape = () => {
  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get('canvasObjects');
    canvasObjects.delete(shapeId);
  }, []);

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get('canvasObjects');
    if (!canvasObjects || canvasObjects.size === 0) return true;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [key, _value] of canvasObjects.entries())
      canvasObjects.delete(key);

    return canvasObjects.size === 0;
  }, []);

  return {
    delete: {
      shape: deleteShapeFromStorage,
      all: deleteAllShapes,
    },
    sync: {
      shape: syncShapeInStorage,
    },
  };
};
