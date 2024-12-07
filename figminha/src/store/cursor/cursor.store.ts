import {
  CHAT,
  HIDDEN,
  REACTION_SELECTOR,
} from '@/@types/props/cursor/mode.type';
import { ICursorState } from '@/@types/props/cursor/state.type';
import { ICursorStateStore } from '@/@types/store/cursor/state.type';
import { ICursorChatState } from '@/@types/store/cursor/state/chat.type';
import { create } from 'zustand';

export const useCursorState = create<ICursorStateStore>(set => ({
  state: {
    mode: HIDDEN,
    message: null,
    previousMessage: null,
    reaction: null,
    isPressed: false,
  },
  setState: (newState: ICursorState) =>
    set(oldState => ({ ...oldState, state: newState })),
  setChatState: ({ message, previousMessage }: ICursorChatState) =>
    set(state => ({
      ...state,
      state: {
        mode: CHAT,
        message,
        previousMessage,
      },
    })),
  setHiddenState: () => set(state => ({ ...state, state: { mode: HIDDEN } })),
  setPressed: (isPressed: boolean) => set(state => ({ ...state, isPressed })),
  setReactionSelectorState: () =>
    set(state => ({ ...state, state: { mode: REACTION_SELECTOR } })),
}));
