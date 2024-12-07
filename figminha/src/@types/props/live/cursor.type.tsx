import { BaseUserMeta, User } from '@liveblocks/client';
import { Presence } from './presence.type';

export interface ILiveCursorProps {
  others: readonly User<Presence, BaseUserMeta>[];
}
