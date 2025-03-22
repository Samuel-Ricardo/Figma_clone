import { useMutation } from '../../../../liveblocks.config';

export const useShape = () => {
  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get('canvasObjects');
    canvasObjects.delete(shapeId);
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
