'use client';

import { IChatBubbleProps } from '@/@types/props/chat/bubble.type';

export const ChatBubble = ({ color, message }: IChatBubbleProps) => (
  <div
    className="absolute left-2 top-5 rounded-3xl px-4 py-2"
    style={{ backgroundColor: color, borderRadius: 20 }}
  >
    <p className="whitespace-nowrap text-sm leading-relaxed text-white">
      {message}
    </p>
  </div>
);
