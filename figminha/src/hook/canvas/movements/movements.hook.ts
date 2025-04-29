import { useCanvas } from '../canvas.hook';
import { useShapeStore } from '@/store/canvas/shape/shape.store';
import { useFabricState } from '@/store/canvas/fabric/fabric.store';
import { KeyboardEvent, useCallback } from 'react';
import { useShapeCreator } from '../shape/creator/shape.hook';
import { ICanvasMouseEvent } from '@/@types/fabric/events/mouse/mouse.type';
import { useShapeTarget } from '../shape/target/target.hook';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { useShape } from '../shape/shape.hook';
import { useActiveElementStore } from '@/store/canvas/element/active.store';
import { ICanvasObjectMoving } from '@/@types/fabric/events/object/moving.type';
import { useCanvasActions } from '../actions/actions.hook';
import { IClampTargetPosition } from '@/@types/canvas/target/position/clamp/clamp.type';
import { ICanvasSelectionCreated } from '@/@types/fabric/events/selection/created.type';
import { useActiveElement } from '../element/active.hook';
import { ICanvasObjectScaling } from '@/@types/fabric/events/object/scaling.type';
import { ICanvasMouseWheelEvent } from '@/@types/fabric/events/mouse/wheel.type';

//canvasGestures
export const useCanvasMovements = () => {
  const { stopDrawn, startDrawn, dynamicZoom, resize, copy } = useCanvas();
  const { clampTargetPositionX, clampTargetPositionY } = useCanvasActions();
  const { isDrawing, activeObjectRef, isEditing } = useCanvasStore();
  const { shapeRef, selectedShapeRef, setSelectedShapeRef } = useShapeStore();
  const { newShapeFromPoint } = useShapeCreator();
  const { syncShapeInStorage } = useShape();
  const { fabricRef } = useFabricState();
  const { resetDefault } = useActiveElementStore();
  const { syncElementAttributes, resizeElement } = useActiveElement();

  const { setupTarget, isTargetTheActiveSelection, isTargetTheSelectedShape } =
    useShapeTarget();

  const handleCanvasMouseDown = useCallback(
    ({ options }: ICanvasMouseEvent) => {
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
    ({ options }: ICanvasMouseEvent) => {
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

  const clampTargetPosition = useCallback(
    ({ target, canvas }: IClampTargetPosition) => {
      target.setCoords();

      if (target.left) clampTargetPositionX({ target, canvas });
      if (target.top) clampTargetPositionY({ target, canvas });
    },
    [clampTargetPositionX, clampTargetPositionY],
  );

  const handleCanvasObjectMoving = useCallback(
    ({ options }: ICanvasObjectMoving) => {
      const target = options.target;
      if (!target) return;
      const canvas = target.canvas;
      if (!canvas) return;

      clampTargetPosition({ target, canvas });
    },
    [clampTargetPosition],
  );

  const handleCanvasObjectScaling = useCallback(
    ({ options: { target: selected } }: ICanvasObjectScaling) =>
      resizeElement({ selected }),
    [resizeElement],
  );

  const handleCanvasSelectionCreated = useCallback(
    ({ options }: ICanvasSelectionCreated) => {
      const selected = options.selected[0];
      if (selected && !isEditing && options.selected.length === 1)
        syncElementAttributes({ selected });
    },
    [isEditing, syncElementAttributes],
  );

  const handleCanvasMouseWheel = useCallback(
    ({ e }: ICanvasMouseWheelEvent) => {
      if (!fabricRef?.current) return;

      dynamicZoom({
        delta: e.deltaY,
        zoom: fabricRef.current.getZoom(),
        position: { x: e.offsetX, y: e.offsetY },
      });

      e.preventDefault();
      e.stopPropagation();
    },
    [fabricRef, dynamicZoom],
  );

  const handleCanvasObjectResize = useCallback(() => resize(), [resize]);

  const handleCanvasKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const pressCtrl = event?.ctrlKey || event?.metaKey;
      const pressC = event.key === 'c' || event.key === 'C';

      if (pressCtrl && pressC) copy();
    },
    [copy],
  );

  return {
    handleCanvasMouseDown,
    handleCanvaseMouseMove,
    handleCanvasMouseUp,
    handleCanvasObjectMovement: handleCanvasObjectMoving,
    handleCanvasSelectionCreated,
    handleCanvasObjectScaling,
    handleCanvasMouseWheel,
    handleCanvasObjectResize,
    handleCanvasKeyDown,
  };
};
