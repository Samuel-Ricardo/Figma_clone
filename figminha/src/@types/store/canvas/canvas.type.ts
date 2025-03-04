export interface ICanvasStore {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | null> | null;
  setCanvasRef: (
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | null,
  ) => void;
}
