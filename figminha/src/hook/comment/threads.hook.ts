import { useThreads, useCreateThread } from '@liveblocks/react/suspense';
import { useSelf, useOthers } from '@liveblocks/react';
import { ICreateCommentData, ICreateReplyData } from '@/@types/comment/thread.type';
import { useMemo } from 'react';

export const useCommentThreads = () => {
  const { threads } = useThreads();
  const createThread = useCreateThread();
  const self = useSelf();
  const others = useOthers();

  // Get all present users for mentions
  const presentUsers = useMemo(() => {
    const users = [];
    
    if (self) {
      users.push({
        id: self.id,
        name: self.info?.name || `User ${self.id}`,
        avatar: self.info?.avatar,
      });
    }

    others.forEach(user => {
      users.push({
        id: user.id,
        name: user.info?.name || `User ${user.id}`,
        avatar: user.info?.avatar,
      });
    });

    return users;
  }, [self, others]);

  const createComment = async (data: ICreateCommentData) => {
    if (!self) return;

    const thread = await createThread({
      body: {
        version: 1,
        content: [
          {
            type: 'paragraph',
            children: [{ text: data.content }],
          },
        ],
      },
      metadata: {
        x: data.x,
        y: data.y,
        elementId: data.elementId,
        type: data.type,
        resolved: false,
      },
    });

    return thread;
  };

  const createReply = async (data: ICreateReplyData) => {
    // For now, we'll create a new thread as a workaround
    // In a real implementation, this would add to the existing thread
    console.log('Creating reply:', data);
    // TODO: Implement proper reply functionality once Liveblocks API is clarified
    return Promise.resolve();
  };

  const resolveThread = async (threadId: string) => {
    // For now, just log the action
    // TODO: Implement with proper Liveblocks API
    console.log('Resolving thread:', threadId);
    return Promise.resolve();
  };

  const reopenThread = async (threadId: string) => {
    // For now, just log the action  
    // TODO: Implement with proper Liveblocks API
    console.log('Reopening thread:', threadId);
    return Promise.resolve();
  };

  const deleteThread = async (threadId: string) => {
    // For now, just log the action
    // TODO: Implement with proper Liveblocks API
    console.log('Deleting thread:', threadId);
    return Promise.resolve();
  };

  return {
    threads,
    presentUsers,
    createComment,
    createReply,
    resolveThread,
    reopenThread,
    deleteThread,
  };
};