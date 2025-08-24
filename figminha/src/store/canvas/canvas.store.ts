import { ICanvasStore } from '@/@types/store/canvas/canvas.type';
import { create } from 'zustand';

export const useCanvasStore = create<ICanvasStore>(set => ({
  canvasRef: null,
  clipboard: [],
  isDrawing: false,
  isEditing: false,
  canvasObjects: null, //useStorage(root => root.canvasObjects)
  activeObjectRef: null,
  imageInputRef: null,

  setCanvasRef: canvasRef => set({ canvasRef }),
  setActiveObjectRef: activeObjectRef => set({ activeObjectRef }),
  setImageInputRef: imageInputRef => set({ imageInputRef }),
  setClipboard: clipboard => {
    localStorage.setItem('clipboard', JSON.stringify(clipboard));
    set({ clipboard });
  },

  clearClipboard: () => {
    localStorage.removeItem('clipboard');
    set({ clipboard: [] });
  },

  getClipboard: () => {
    const clipboard = JSON.parse(localStorage.getItem('clipboard') || '[]');
    set({ clipboard });
    return clipboard;
  },

  startDrawing: () => set({ isDrawing: true }),
  stopDrawing: () => set({ isDrawing: false }),

  startEditing: () => set({ isEditing: true }),
  stopEditing: () => set({ isEditing: false }),

  clearActiveObjectRef: () => set({ activeObjectRef: null }),
  clearCanvasRef: () => set({ canvasRef: null }),
  clearImageInputRef: () => set({ imageInputRef: null }),
}));
