'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { MODULES } from '@/@modules/app.factory';
import { LiveMap } from '@liveblocks/client';
import Loader from '../../app/components/loader/loader.component';

export function LiveblocksRoomProvider({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      publicApiKey={MODULES.INFRA.CONFIG.LIVE_BLOCK.API.KEY || 'pk_1'}
    >
      <RoomProvider
        id="my-room"
        initialPresence={{ cursor: null, cursorColor: null, editingText: null }}
        initialStorage={{ canvasObjects: new LiveMap() }}
      >
        <ClientSideSuspense fallback={<Loader />}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
