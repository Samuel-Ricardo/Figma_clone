import { useEffect } from 'react';
import { useNewThreadCursorUpdateListener } from '../../../../hook/comments/thread/cursor/listen/update.hook';
import { INewThreadCursorProps } from '@/@types/props/thread/cursor/cursor.type';
import * as Portal from '@radix-ui/react-portal';
import { useThreadCursorStore } from '@/store/cursor/thread/cursor.store';

export const NewThreadCursor = ({ display }: INewThreadCursorProps) => {
  const { listner } = useNewThreadCursorUpdateListener();
  useEffect(listner, [listner]);

  const { coordinates } = useThreadCursorStore();

  useEffect(() => {
    if (display) document.documentElement.classList.add('hide-cursor');
    else document.documentElement.classList.remove('hide-cursor');
  }, [display]);

  return display ? (
    <Portal.Root>
      <div
        className="pointer-events-none fixed left-0 top-0 w-9 h-9 cursor-grab select-none rounded-bl-full rounded-tr-full bg-white shadow-2xl"
        style={{
          transform: `translate(${coordinates.x}px, ${coordinates.y}px)`,
        }}
      />
    </Portal.Root>
  ) : null;
};
