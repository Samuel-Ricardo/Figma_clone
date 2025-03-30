export interface IActiveElementStore {
  element?: IElement | null;
  attributes?: IElementAttributes | null;

  isActive: (
    value: string | Array<IElement>,
    element?: IElement | null,
  ) => boolean;

  setElement: (element: IElement) => void;
  setElementAttributes: (attributes: IElementAttributes) => void;

  resetDefault: () => void;
  clearElement: () => void;
}

export interface IElement {
  name: string;
  value: string;
  icon: string;
}

export interface IElementAttributes {
  width: string;
  height: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fill: string;
  stroke: string;
}
