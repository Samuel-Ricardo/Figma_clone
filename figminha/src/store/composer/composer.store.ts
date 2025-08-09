import { IComposerStore } from '@/@types/store/composer/composer.type';
import { create } from 'zustand';

export const useComposerStore = create<IComposerStore>(set => ({
  coordinates: { x: 0, y: 0 },
  allowComposer: false,

  setCoordinates: coordinates => set({ coordinates }),
  setAllowComposer: allowComposer => set({ allowComposer }),
}));
