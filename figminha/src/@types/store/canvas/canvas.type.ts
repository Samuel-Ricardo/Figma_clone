import { ICustomFabricObject } from '@/@types/fabric/object.type';
import { LiveMap } from '@liveblocks/client';
import { Object } from 'fabric';

export interface ICanvasStore {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | null> | null;
  clipboard: ICustomFabricObject[];
  isDrawing: boolean;
  isEditing: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvasObjects?: LiveMap<string, any> | null;
  activeObjectRef?: React.MutableRefObject<Object | null> | null;
  imageInputRef?: React.MutableRefObject<HTMLInputElement | null> | null;

  setCanvasRef: (
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | null,
  ) => void;
  setActiveObjectRef: (
    activeObjectRef: React.MutableRefObject<Object | null> | null,
  ) => void;
  setImageInputRef: (
    imageInputRef: React.MutableRefObject<HTMLInputElement | null> | null,
  ) => void;

  setClipboard: (clipboard: ICustomFabricObject[]) => void;
  clearClipboard: () => void;
  getClipboard: () => ICustomFabricObject[];

  startDrawing: () => void;
  stopDrawing: () => void;

  startEditing: () => void;
  stopEditing: () => void;

  clearCanvasRef: () => void;
  clearActiveObjectRef: () => void;
  clearImageInputRef: () => void;
}
