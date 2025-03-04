export interface ICanvasStore {
  canvasRef?: React.MutableRefObject<HTMLCanvasElement | null>;
  setCanvasRef: (
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  ) => void;
}
