import { IComposerStore } from '@/@types/store/composer/composer.type';
import { create } from 'zustand';

export const useComposerStore = create<IComposerStore>(set => ({
  coordinates: { x: 0, y: 0 },

  setCoordinates: coordinates => set({ coordinates }),
}));
