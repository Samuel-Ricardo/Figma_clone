import { useThreadManager } from '@/hook/comments/thread/manager.hook';
import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren } from 'react';

export const NewThread = ({ children }: PropsWithChildren) => {
  useThreadManager();

  return (
    <>
      <Slot>{children}</Slot>
    </>
  );
};
