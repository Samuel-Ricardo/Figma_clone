import { Reaction } from '@/@types/props/reaction/reaction.type';
import { IReactionEvent, IReactionStore } from '@/@types/store/reaction.type';
import { create } from 'zustand';

export const useReactionState = create<IReactionStore>(set => ({
  reaction: null,
  reactions: [],

  setReaction: (reaction: Reaction) => set({ reaction }),
  clearReaction: () => set({ reaction: null }),

  addReaction: ({
    position,
    reaction,
    timestamp = Date.now(),
  }: IReactionEvent) => {
    set(state => ({
      ...state,
      reactions: state.reactions.concat({
        reaction,
        position,
        timestamp,
      }),
    }));
  },
  clearReactions: () =>
    set(state => ({
      ...state,
      reactions: state.reactions.filter(
        reaction => reaction.timestamp > Date.now() - 4000,
      ),
    })),
}));
