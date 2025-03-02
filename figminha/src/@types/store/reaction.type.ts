import { IPosition } from '../position.type';
import { Reaction } from '../props/reaction/reaction.type';

export interface IReactionStore {
  reaction: Reaction | null;
  reactions: IReactionAnimation[];
  setReaction: (reaction: Reaction) => void;
  clearReactions: () => void;
  addReaction: ({ position, reaction }: IReactionEvent) => void;
}

export interface IReactionAnimation {
  reaction: Reaction;
  timestamp: number;
  position: IPosition;
}

export interface IReactionEvent {
  position: IPosition;
  reaction: Reaction;
  timestamp?: number;
}
