import { useActiveElementStore } from '@/store/canvas/element/active.store';
import { useCallback } from 'react';
import { useShape } from '../shape/shape.hook';
import { useCanvas } from '../canvas.hook';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { IElement } from '@/@types/store/canvas/element/active.type';
import { useShapeStore } from '@/store/canvas/shape/shape.store';
import { ISyncCanvasElementAttributes } from '@/@types/canvas/element/attribute/sync.type';

export const useActiveElement = () => {
  const { clearElement, resetDefault, setElement, setElementAttributes } =
    useActiveElementStore();
  const { deleteAllShapes } = useShape();
  const { setSelectedShapeRef } = useShapeStore();
  const { deleteElementHandler, stopDrawn } = useCanvas();
  const { imageInputRef } = useCanvasStore();

  const resetElement = useCallback(() => {
    deleteAllShapes();
    clearElement();
    resetDefault();
  }, [deleteAllShapes, clearElement, resetDefault]);

  const deleteElement = useCallback(() => {
    deleteElementHandler();
    resetDefault();
  }, [deleteElementHandler, resetDefault]);

  const initImageUpload = useCallback(() => {
    imageInputRef?.current?.click();
    stopDrawn();
  }, [imageInputRef, stopDrawn]);

  const handleActiveElement = useCallback(
    (element: IElement) => {
      setElement(element);

      switch (element.value) {
        case 'reset':
          resetElement();
          break;

        case 'delete':
          deleteElement();
          break;

        case 'image':
          initImageUpload();
          break;

        case 'comments':
          break;

        default:
          setSelectedShapeRef(element.value);
          break;
      }
    },
    [
      setElement,
      resetElement,
      deleteElement,
      initImageUpload,
      setSelectedShapeRef,
    ],
  );

  const syncElementAttributes = useCallback(
    ({ selected }: ISyncCanvasElementAttributes) => {
      const scaledWidth = selected.scaleX
        ? selected.width * selected.scaleX
        : selected.width;

      const scaledHeight = selected.scaleY
        ? selected.height * selected.scaleY
        : selected.height;

      setElementAttributes({
        width: scaledWidth.toFixed(0).toString() || '',
        height: scaledHeight.toFixed(0).toString() || '',
        fill: selected.fill?.toString() || '',
        stroke: selected.stroke?.toString() || '',
        //@ts-expect-error ts-migrate(2339) FIXME: Property 'fontSize' does not exist on type 'ICustomFabricObject'...
        fontSize: selected.fontSize || '',
        //@ts-expect-error ts-migrate(2339) FIXME: Property 'fontFamily' does not exist on type 'ICustomFabricObject'...
        fontFamily: selected.fontFamily || '',
        //@ts-expect-error ts-migrate(2339) FIXME: Property 'fontWeight' does not exist on type 'ICustomFabricObject'...
        fontWeight: selected.fontWeight || '',
      });
    },
    [setElementAttributes],
  );

  return { handleActiveElement, syncElementAttributes };
};
