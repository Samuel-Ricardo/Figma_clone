import { useEffect } from 'react';
import { useCanvasGestures } from './gestures/gestures.hook';
import { useCanvasStore } from '@/store/canvas/canvas.store';
import { useCanvas } from './canvas.hook';

export const useSetupCanvas = () => {
  const { canvasObjects } = useCanvasStore();
  const { render } = useCanvas();

  useCanvasGestures();

  useEffect(() => render(), [canvasObjects]);
};
