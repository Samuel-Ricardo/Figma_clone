import { ClientSideSuspense } from '@liveblocks/react';

export const Comments = () => (
  <ClientSideSuspense fallback={<div>Loading...</div>}>
    : D{/*() => <CommentsOverlay />*/}
  </ClientSideSuspense>
);
