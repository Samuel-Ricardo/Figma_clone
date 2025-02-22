import { Reaction } from '../props/reaction/reaction.type';

export interface IReactionStore {
  reaction: Reaction | null;
  setReaction: (reaction: Reaction) => void;
  clearReaction: () => void;
}
