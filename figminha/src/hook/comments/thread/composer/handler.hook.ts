import { useComposerClick } from '@/hook/mouse/click/composer.hook';
import { useCommentCreationState } from '../../state/creation.hook';
import { useComposerStore } from '@/store/composer/composer.store';
import { usePointerStore } from '@/store/pointer/pointer.store';

export const useComposerHandler = () => {
  const { commentCreated, commentPlaced } = useCommentCreationState();
  const { setCoordinates, allowComposer, setAllowComposer } =
    useComposerStore();
  const { setLastEvent } = usePointerStore();

  const { isClickInsideComposer } = useComposerClick();

  const closeComposer = (e: MouseEvent) => {
    if (!isClickInsideComposer(e)) commentCreated();
  };

  const placeComposer = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;

    commentPlaced();
    setCoordinates({ x, y });
  };

  const allowComposerUse = (event: PointerEvent) => {
    if (allowComposer) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event as any)._saveComposedPath = event.composedPath();

    setLastEvent(event);
    setAllowComposer(true);
  };

  const resetComposerState = () => {
    setCoordinates({ x: 0, y: 0 });
    setAllowComposer(false);
    commentCreated();
  };

  return {
    resetComposerState,
    allowComposerUse,
    closeComposer,
    placeComposer,
  };
};
