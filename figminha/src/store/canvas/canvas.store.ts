import { ICanvasStore } from '@/@types/store/canvas/canvas.type';
import { create } from 'zustand';

export const useCanvasStore = create<ICanvasStore>(set => ({
  canvasRef: null,
  setCanvasRef: canvasRef => set({ canvasRef }),
}));
