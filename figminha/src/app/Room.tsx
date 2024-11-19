'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { MODULES } from '@/@modules/app.factory';

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={MODULES.INFRA.CONFIG.LIVE_BLOCK.API.KEY}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
