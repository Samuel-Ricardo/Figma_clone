import { useCommentCreationState } from '@/hook/comments/state/creation.hook';
import { useComposerForm } from '@/hook/comments/thread/composer/form.hook';
import { useThreadManager } from '@/hook/comments/thread/manager.hook';
import { useComposerStore } from '@/store/composer/composer.store';
import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren } from 'react';
import * as Portal from '@radix-ui/react-portal';
import { PinnedComposer } from './composer/pinned/pinned.component';
import { NewThreadCursor } from './cursor/cursor.component';

export const NewThread = ({ children }: PropsWithChildren) => {
  useThreadManager();

  const { commentPlacing, commentCreated, isCompleted, isPlaced } =
    useCommentCreationState();
  const { coordinates, allowComposer } = useComposerStore();
  const { submit } = useComposerForm();

  return (
    <>
      <Slot
        onClick={() => (isCompleted ? commentPlacing : commentCreated)}
        style={{ opacity: isCompleted ? 0.7 : 1 }}
      >
        {children}
      </Slot>

      {coordinates && isPlaced ? (
        <Portal.Root
          className="absolute left-8 top-0"
          style={{
            pointerEvents: allowComposer ? 'initial' : 'none',
            transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
          }}
          data-hide-cursors
        >
          <PinnedComposer onComposerSubmit={submit} />
        </Portal.Root>
      ) : null}

      <NewThreadCursor display={true} />
    </>
  );
};
