import { Canvas } from 'fabric';

export interface IFabricStore {
  fabricRef: React.MutableRefObject<Canvas | null> | null;

  setFabricRef: (
    fabricRef: React.MutableRefObject<Canvas | null> | null,
  ) => void;
  clearFabricRef: () => void;
}
