import { INewThread } from '@/@types/hook/comment/thread/new.type';
import { useCreateThread } from '../../../../liveblocks.config';
import { useMaxZIndex } from '@/lib/utils/style/zindex.lib';

export const useCommentThread = () => {
  const createThread = useCreateThread();
  const zIndex = useMaxZIndex() + 1;

  return {
    newThread: ({ composer: { body }, position: { x, y } }: INewThread) =>
      createThread({
        body,
        metadata: {
          x,
          y,
          resolved: false,
          zIndex,
        },
      }),
  };
};
