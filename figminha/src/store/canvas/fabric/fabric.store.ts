import { IFabricStore } from '@/@types/store/canvas/fabric/fabric.type';
import { create } from 'zustand';

export const useFabricState = create<IFabricStore>(set => ({
  fabricRef: null,

  setFabricRef: fabricRef => set({ fabricRef }),
  clearFabricRef: () => set({ fabricRef: null }),
}));
