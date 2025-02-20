import { IOption } from '@/@types/option.type';

export const ALIGN_OPTIONS: IOption[] = [
  { value: 'left', label: 'Align Left', icon: '/assets/align-left.svg' },
  {
    value: 'horizontalCenter',
    label: 'Align Horizontal Center',
    icon: '/assets/align-horizontal-center.svg',
  },
  { value: 'right', label: 'Align Right', icon: '/assets/align-right.svg' },
  { value: 'top', label: 'Align Top', icon: '/assets/align-top.svg' },
  {
    value: 'verticalCenter',
    label: 'Align Vertical Center',
    icon: '/assets/align-vertical-center.svg',
  },
  { value: 'bottom', label: 'Align Bottom', icon: '/assets/align-bottom.svg' },
];
