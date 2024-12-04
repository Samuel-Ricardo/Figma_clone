import { ICursorState } from '@/@types/props/cursor/state.type';
import { ICursorChatState } from './state/chat.type';

export interface ICursorStateStore {
  state: ICursorState;

  setState: (state: ICursorState) => void;
  setChatState: ({ message, previousMessage }: ICursorChatState) => void;
  setHiddenState: () => void;
}
