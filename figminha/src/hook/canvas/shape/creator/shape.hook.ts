import {
  IShapeCreator,
  IShapeFormCreator,
} from '@/@types/canvas/shape/creator.type';
import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { Circle, Rect, Triangle, IText, Line, Point } from 'fabric';
import { useCallback } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useCanvas } from '../../canvas.hook';
import { useShapeStore } from '@/store/canvas/shape/shape.store';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';

export const useShapeCreator = () => {
  const { startDrawn } = useCanvas();
  const { selectedShapeRef, shapeRef } = useShapeStore();
  const { fabricRef } = useFabricState();

  const createRectangle = useCallback(
    ({ pointer: { x, y } }: IShapeFormCreator) =>
      new Rect({
        left: x,
        top: y,
        width: 100,
        height: 100,
        fill: '#3fdfcd',
        objectId: uuidV4(),
      }) as ICustomFabricObject,
    [],
  );

  const createTriangle = useCallback(
    ({ pointer: { x, y } }: IShapeFormCreator) =>
      new Triangle({
        left: x,
        top: y,
        width: 100,
        height: 100,
        fill: '#aabbcc',
        objectId: uuidV4(),
      }) as ICustomFabricObject,
    [],
  );

  const createCircle = useCallback(
    ({ pointer: { x, y } }: IShapeFormCreator) =>
      new Circle({
        left: x,
        top: y,
        radius: 100,
        fill: '#aabbcc',
        objectId: uuidV4(),
      }) as ICustomFabricObject,
    [],
  );

  const createLine = useCallback(
    ({ pointer: { x, y } }: IShapeFormCreator) =>
      new Line([x, y, x + 100, y + 100], {
        objectId: uuidV4(),
        stroke: 'aabbcc',
        strokeWidth: 2,
      }) as ICustomFabricObject,
    [],
  );

  const createText = useCallback(
    ({ pointer: { x, y }, text = 'Tap to Type' }: IShapeFormCreator) =>
      new IText(text, {
        objectId: uuidV4(),
        left: x,
        top: y,
        fill: '#aabbcc',
        fontFamily: 'Helveticas',
        fontSize: 36,
        fontWeight: '400',
      }),
    [],
  );

  const createShape = useCallback(
    ({ type, pointer }: IShapeCreator) => {
      switch (type) {
        case 'rectangle':
          return createRectangle({ pointer });
        case 'triangle':
          return createTriangle({ pointer });
        case 'circle':
          return createCircle({ pointer });
        case 'line':
          return createLine({ pointer });
        case 'text':
          return createText({ pointer });
        case 'freeform':
          return startDrawn();
        default:
          return null;
      }
    },
    [
      createRectangle,
      createTriangle,
      createCircle,
      createLine,
      createText,
      startDrawn,
    ],
  );
};
