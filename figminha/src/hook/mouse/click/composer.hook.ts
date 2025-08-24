import { usePointerStore } from '@/store/pointer/pointer.store';

export const useComposerClick = () => {
  const { setLastEvent } = usePointerStore();

  const isClickInsideComposer = (event: MouseEvent) =>
    event
      .composedPath()
      .some((el: EventTarget) =>
        (el as HTMLElement)?.classList?.contains('lb-composer-editor-actions'),
      );

  const savePointerEvent = (event: PointerEvent) => {
    (event as any)._savedComposedPath = event?.composedPath();

    setLastEvent(event);
  };

  return {
    isClickInsideComposer,
    savePointerEvent,
  };
};
