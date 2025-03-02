import { IIconElement } from '@/@types/element/icon.type';
import { SHAPE_ELEMENTS } from '../shape/elements.const';
import { IElement } from '@/@types/store/canvas/element/active.type';

export const NAV_ELEMENTS: IIconElement[] | IElement[] = [
  {
    icon: '/assets/select.svg',
    name: 'Select',
    value: 'select',
  },
  {
    icon: '/assets/rectangle.svg',
    name: 'Rectangle',
    value: SHAPE_ELEMENTS,
  },
  {
    icon: '/assets/text.svg',
    value: 'text',
    name: 'Text',
  },
  {
    icon: '/assets/delete.svg',
    value: 'delete',
    name: 'Delete',
  },
  {
    icon: '/assets/reset.svg',
    value: 'reset',
    name: 'Reset',
  },
  {
    icon: '/assets/comments.svg',
    value: 'comments',
    name: 'Comments',
  },
];

export const DEFAULT_NAV_ELEMENT: IIconElement = {
  icon: '/assets/select.svg',
  name: 'Select',
  value: 'select',
};
