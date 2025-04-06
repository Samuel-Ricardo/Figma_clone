'use client';

import { useOthers, useSelf } from '@liveblocks/react';
import { useMemo } from 'react';
import { Avatar } from '../avatar/avatar.component';
import { generateRandomNames } from '@/utils/random/name.util';

export const ActiveUsers = () => {
  const others = useOthers();
  const currentUser = useSelf();

  const memorizedComponent = useMemo(() => {
    const hasMoreThanTwoUser = others.length > 2;

    return (
      <div>
        {currentUser && (
          <Avatar name="You" otherStyles="border-[3px] border-green-500" />
        )}

        {others.slice(0, 2).map(({ connectionId }) => (
          <Avatar
            key={connectionId}
            name={generateRandomNames()}
            otherStyles="-ml-3"
          />
        ))}

        {hasMoreThanTwoUser && (
          <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black">
            +{others.length - 2}
          </div>
        )}
      </div>
    );
  }, [others.length]);

  return memorizedComponent;
};
