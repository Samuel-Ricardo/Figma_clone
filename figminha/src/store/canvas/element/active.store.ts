import { IActiveElementStore } from '@/@types/store/canvas/element/active.type';
import { create } from 'zustand';

export const useActiveElement = create<IActiveElementStore>(set => ({
  element: null,
  imageInputRef: null,

  isActive: (value, element) =>
    (element && element.value === value) ||
    (Array.isArray(value) && value.some(val => val?.value === element?.value)),

  setElement: element => set({ element }),
  setImageInputRef: imageInputRef => set({ imageInputRef }),

  clearElement: () => set({ element: null }),
  clearImageInputRef: () => set({ imageInputRef: null }),
}));
