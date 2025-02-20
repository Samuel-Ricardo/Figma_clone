import { CursorMode } from '@/@types/props/cursor/mode.type';

export type ICursorState =
  | {
      mode: CursorMode.HIDDEN;
    }
  | {
      mode: CursorMode.CHAT;
      message: string;
      previousMessage: string | null;
    }
  | {
      mode: CursorMode.REACTION_SELECTOR;
    }
  | {
      mode: CursorMode.REACTION;
      reaction: string;
      isPressed: boolean;
    };
