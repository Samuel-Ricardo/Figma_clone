import { NAV_ELEMENTS, DEFAULT_NAV_ELEMENT } from './nav/elements.const';
import { SHAPE_ELEMENTS } from './shape/elements.const';
import { COLORS } from './color.const';
import { ALIGN_OPTIONS } from './options/align.const';
import { DIRECTION_OPTIONS } from './options/directions.const';
import { FONT_FAMILY_OPTIONS } from './options/font/family.const';
import { FONT_SIZE_OPTIONS } from './options/font/size.const';
import { FONT_WEIGHT_OPTIONS } from './options/font/weight.const';
import { SHORTCUT } from './shortcut.const';
import { STORAGE } from './storage/storage.const';
import { REACTIONS } from './reaction/reaction.const';

export const CONST = {
  COLORS,
  SHAPE_ELEMENTS,
  SHORTCUT,
  STORAGE,
  REACTIONS,

  NAV: {
    ELEMENT: {
      ALL: NAV_ELEMENTS,
      DEFAULT: DEFAULT_NAV_ELEMENT,
    },
  },

  OPTIONS: {
    DIRECTIONS: DIRECTION_OPTIONS,
    ALIGN: ALIGN_OPTIONS,
    FONTS: {
      FAMILY: FONT_FAMILY_OPTIONS,
      SIZE: FONT_SIZE_OPTIONS,
      WEIGHT: FONT_WEIGHT_OPTIONS,
    },
  },
};
