import './componser.style.scss';

import { IThreadComposerProps } from '@/@types/props/thread/composer.type';
import * as Portal from '@radix-ui/react-portal';
import { PinnedComposer } from './pinned/pinned.component';

export const ThreadComposer = ({}: IThreadComposerProps) => {
  return (
    <Portal.Root className="thread-componser" data-hide-cursors>
      <PinnedComposer onComposerSubmit={console.log} />
    </Portal.Root>
  );
};
