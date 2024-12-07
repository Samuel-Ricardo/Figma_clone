import { useOthers } from '@liveblocks/react';
import { LiveCursors } from './cursor/cursor.component';

export const Live = () => {
  const others = useOthers();

  return (
    <div className="h-[100vh] w-full flex justify-center items-center text-center border-5 border-green-500">
      <h1 className="text-2xl text-white">Hello World</h1>

      <LiveCursors others={others} />
    </div>
  );
};
