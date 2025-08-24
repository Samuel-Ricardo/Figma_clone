import Image from 'next/image';
import './pinned.style.scss';

import { Composer } from '@liveblocks/react-comments';
import { IPinnedComposerProps } from '@/@types/props/thread/composer/pinned.type';

export const PinnedComposer = ({ onComposerSubmit }: IPinnedComposerProps) => {
  return (
    <div className="pinned-composer--container">
      <div className="pinned-composer--avatar">
        <Image
          src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
          alt="Someone"
          width={24}
          height={24}
        />
      </div>
      <div className="pinned-composer--content">
        {/*Comment*/}
        <Composer
          autoFocus
          onKeyUp={e => e.stopPropagation()}
          onComposerSubmit={onComposerSubmit}
        />
      </div>
    </div>
  );
};
