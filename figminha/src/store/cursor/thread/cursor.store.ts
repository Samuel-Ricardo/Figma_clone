import { INewThreadCursorStore } from '@/@types/store/cursor/thread/cursor.type';
import { create } from 'zustand';

const DEFAULT_CURSOR_POSITION = -10000;

export const useThreadCursorStore = create<INewThreadCursorStore>(set => ({
  coordinates: { x: DEFAULT_CURSOR_POSITION, y: DEFAULT_CURSOR_POSITION },
  setCoordinates: coordinates => set({ coordinates }),
}));
