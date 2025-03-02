import { ICursorState } from '@/@types/props/cursor/state.type';
import { ICursorChatState } from './state/chat.type';
import { Reaction } from '@/@types/props/reaction/reaction.type';

export interface ICursorStateStore {
  state: ICursorState;

  setState: (state: ICursorState) => void;

  setChatState: ({ message, previousMessage }: ICursorChatState) => void;
  setHiddenState: () => void;
  setPressed(state: boolean): void;

  setReactionSelectorState(): void;
  setReactionState({
    isPressed,
    reaction,
  }: {
    reaction: Reaction;
    isPressed?: boolean;
  }): void;
}
