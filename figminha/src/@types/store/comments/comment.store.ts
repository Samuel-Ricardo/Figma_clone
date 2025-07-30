import { CreationCommentState } from '@/@types/comment/state/creation.type';

export interface ICommentStore {
  state: CreationCommentState;

  setState: (state: CreationCommentState) => void;
}
