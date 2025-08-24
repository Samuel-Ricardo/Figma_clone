import { useCommentCreationSubscriber } from './events/comment/new.hook';
import { usePlacementCancelSubscriber } from './events/composer/placement/cancel.hook';
import { useComposerAllowmentSubscriber } from './events/composer/use.hook';
import { usePointerMoveSubscriber } from './events/pointer/move.hook';

export const useThreadManager = () => {
  useCommentCreationSubscriber();
  usePointerMoveSubscriber();

  usePlacementCancelSubscriber();
  useComposerAllowmentSubscriber();
};
