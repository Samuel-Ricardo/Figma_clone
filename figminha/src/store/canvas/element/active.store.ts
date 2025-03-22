import { IActiveElementStore } from '@/@types/store/canvas/element/active.type';
import { create } from 'zustand';

export const useActiveElement = create<IActiveElementStore>(set => ({
  element: null,
  attributes: {
    width: '0px',
    height: '0px',
    fontFamily: 'Arial',
    fontSize: '0px',
    fontWeight: '0',
    fill: '#aabbcc',
    stroke: '#aabbcc',
  },

  isActive: (value, element) =>
    (element && element.value === value) ||
    (Array.isArray(value) && value.some(val => val?.value === element?.value)),

  setElement: element => set({ element }),

  clearElement: () => set({ element: null }),
}));
