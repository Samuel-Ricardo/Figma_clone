import { IAvatarProps } from '@/@types/props/user/avatar.type';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

import Image from 'next/image';

export const Avatar = ({ name, otherStyles }: IAvatarProps) => {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`relative h-9 w-9 rounded-full ${otherStyles}`}
            data-tooltip={name}
          >
            <Image
              src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
              fill
              alt={name}
              className="rounded-full"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="border-none bg-primary px-2.5 py-1.5 text-xs">
          {name}
        </TooltipContent>
      </Tooltip>
    </>
  );
};
