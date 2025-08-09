import { IPointerStore } from '@/@types/store/pointer/pointer.type';
import { create } from 'zustand';

export const usePointerStore = create<IPointerStore>(set => ({
  lastPointerEvent: undefined,

  setLastEvent: lastPointerEvent => set({ lastPointerEvent }),
}));
