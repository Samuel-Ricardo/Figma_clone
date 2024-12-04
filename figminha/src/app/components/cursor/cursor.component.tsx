import { ICursorProps } from '@/@types/props/cursor/cursor.type';
import CursorSVG from '../../../../public/assets/CursorSVG';
import { ChatBubble } from '../chat/bubble.component';

export const Cursor = ({
  color,
  position: { x, y },
  message,
}: ICursorProps) => {
  return (
    <div
      className="pointer-events-none absolute left-0 top-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG color={color} />

      {message && <ChatBubble color={color} message={message} />}
    </div>
  );
};
