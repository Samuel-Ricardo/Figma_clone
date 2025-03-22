import { LiveMap } from '@liveblocks/client';
import { Object } from 'fabric';

export interface ICanvasStore {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | null> | null;
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

  startDrawing: () => void;
  stopDrawing: () => void;

  startEditing: () => void;
  stopEditing: () => void;

  clearCanvasRef: () => void;
  clearActiveObjectRef: () => void;
  clearImageInputRef: () => void;
}
