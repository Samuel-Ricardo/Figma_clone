import { IBubbleChatInput } from '@/@types/props/chat/bubble/input.type';
import CursorSVG from '../../../../../public/assets/CursorSVG';
import { useCursorStateHandleByKey } from '@/hook/cursor/state/handle/by/key.hook';

export const BubbleChatInput = ({
  previousMessage,
  message,
}: IBubbleChatInput) => {
  const { handleKeyDown } = useCursorStateHandleByKey({
    message,
  });

  return (
    <>
      <CursorSVG color="#000" />

      <div
        className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]"
        onKeyUp={e => e.stopPropagation()}
      >
        {previousMessage && <div> {previousMessage} </div>}

        <input
          className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
          autoFocus
          onKeyDown={handleKeyDown}
          placeholder={previousMessage ? '' : 'Say something…'}
          value={message || ''}
          maxLength={50}
        />
      </div>
    </>
  );
};
