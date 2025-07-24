import Image from 'next/image';
import './pinned.style.scss';

import { Composer } from '@liveblocks/react-comments';

export const PinnedComposer = () => {
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
        <Composer autoFocus onKeyUp={e => e.stopPropagation()} />
      </div>
    </div>
  );
};
