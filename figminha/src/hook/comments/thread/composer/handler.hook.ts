import { useComposerClick } from '@/hook/mouse/click/composer.hook';
import { useCommentCreationState } from '../../state/creation.hook';
import { useComposerStore } from '@/store/composer/composer.store';

export const useComposerHandler = () => {
  const { commentCreated, commentPlaced } = useCommentCreationState();
  const { setCoordinates } = useComposerStore();

  const { isClickInsideComposer } = useComposerClick();

  const closeComposer = (e: MouseEvent) => {
    if (!isClickInsideComposer(e)) commentCreated();
  };

  const placeComposer = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;

    commentPlaced();
    setCoordinates({ x, y });
  };

  return {
    closeComposer,
    placeComposer,
  };
};
