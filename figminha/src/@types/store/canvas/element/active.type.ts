export interface IActiveElementStore {
  element?: IElement | null;
  imageInputRef?: React.RefObject<HTMLInputElement> | null;

  isActive: (
    value: string | Array<IElement>,
    element?: IElement | null,
  ) => boolean;

  setElement: (element: IElement) => void;
  setImageInputRef: (imageInputRef: React.RefObject<HTMLInputElement>) => void;

  clearElement: () => void;
  clearImageInputRef: () => void;
}

export interface IElement {
  name: string;
  value: string;
  icon: string;
}
