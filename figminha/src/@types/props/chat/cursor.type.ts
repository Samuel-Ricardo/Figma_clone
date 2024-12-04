import { IPosition } from '@/@types/position.type';

export interface ICursorChatProps {
  cursor: IPosition;
  updateMyPresence: (
    presence: Partial<{
      cursor: { x: number; y: number };
      cursorColor: string;
      message: string;
    }>,
  ) => void;
}
