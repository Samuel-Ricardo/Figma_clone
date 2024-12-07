import { ILiveCursorProps } from '@/@types/props/live/cursor.type';
import { Cursor } from '../cursor/cursor.component';
import { MODULES } from '@/@modules/app.factory';

export const LiveCursors = ({ others }: ILiveCursorProps) => {
  const { COLORS } = MODULES.INFRA.CONFIG.CONST();
  others.map(({ connectionId, presence }) => {
    if (presence?.cursor)
      return (
        <Cursor
          key={connectionId}
          color={COLORS[Number(connectionId) % COLORS.length]}
          position={{ x: presence.cursor.x, y: presence.cursor.y }}
          message={presence.message}
        />
      );
  });
};
