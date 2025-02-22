import { Reaction } from '@/@types/props/reaction/reaction.type';
import { IReactionStore } from '@/@types/store/reaction.type';
import { create } from 'zustand';

export const useReactionStore = create<IReactionStore>(set => ({
  reaction: null,
  setReaction: (reaction: Reaction) => set({ reaction }),
  clearReaction: () => set({ reaction: null }),
}));
