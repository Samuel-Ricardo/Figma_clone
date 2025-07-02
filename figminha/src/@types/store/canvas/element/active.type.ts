import { IDimension } from './dimension.type';

export interface IActiveElementStore {
  element?: IElement | null;
  attributes?: IElementAttributes | null;

  isActive: (
    value: string | Array<ActiveElement>,
    element?: IElement | null,
  ) => boolean;

  setElement: (element: IElement) => void;
  setElementAttributes: (attributes: IElementAttributes) => void;
  setElementSize: (dimension: IDimension) => void;

  resetDefault: () => void;
  clearElement: () => void;
}

export type ActiveElement = {
  name: string;
  value: string;
  icon: string;
} | null;

export interface IElement<V = string> {
  name: string;
  value: V | Array<ActiveElement>;
  icon: string;
}

export interface IElementAttributes {
  width?: string;
  height?: string;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  fill?: string;
  stroke?: string;
}
