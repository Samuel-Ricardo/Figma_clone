import { LiveMap } from '@liveblocks/client';

export type Storage = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  canvasObjects: LiveMap<string, any>;
};
