import { IPosition } from '@/@types/position.type';
import { ComposerSubmitComment } from '@liveblocks/react-comments';

export interface INewThread {
  composer: ComposerSubmitComment;
  position: IPosition;
}
