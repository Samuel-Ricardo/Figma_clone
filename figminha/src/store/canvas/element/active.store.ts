import { IActiveElementStore } from '@/@types/store/canvas/element/active.type';
import { create } from 'zustand';

const defaultAtributes = {
  width: '0px',
  height: '0px',
  fontFamily: 'Arial',
  fontSize: '0px',
  fontWeight: '0',
  fill: '#aabbcc',
  stroke: '#aabbcc',
};

const defaultElement = {
  icon: '/assets/select.svg',
  name: 'Select',
  value: 'select',
};

export const useActiveElementStore = create<IActiveElementStore>(set => ({
  element: defaultElement,
  attributes: defaultAtributes,

  isActive: (value, element) =>
    (element && element.value === value) ||
    (Array.isArray(value) && value.some(val => val?.value === element?.value)),

  setElement: element => set({ element }),
  resetDefault: () =>
    set({
      element: defaultElement,
      attributes: defaultAtributes,
    }),
  clearElement: () => set({ element: null }),
}));
