import { COMPLETED } from '@/@types/comment/state/creation.type';
import { ICommentStore } from '@/@types/store/comments/comment.store';
import { create } from 'zustand';

export const useCommentStore = create<ICommentStore>(set => ({
  state: COMPLETED,

  setState: state => set({ state }),
}));
