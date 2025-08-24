'use client';

import { useCursorState } from '@/store/cursor/cursor.store';
import { COMMENT } from '@/@types/props/cursor/mode.type';
import { CommentInput } from './input.component';
import { CommentBubble } from './bubble.component';
import { useCommentThreads } from '@/hook/comment/threads.hook';
import { useNotifications } from '@/hook/comment/notifications.hook';
import { useSelf, useOthers } from '@liveblocks/react';
import { useState, useMemo } from 'react';

export const CommentSystem = () => {
  const { state, setHiddenState } = useCursorState();
  const { 
    threads, 
    presentUsers, 
    createComment, 
    createReply, 
    resolveThread, 
    reopenThread 
  } = useCommentThreads();
  const { notifyCommentCreated, notifyCommentReply, notifyThreadResolved } = useNotifications();
  const self = useSelf();
  const others = useOthers();
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);

  // Create a user lookup map
  const userMap = useMemo(() => {
    const map = new Map();
    if (self) {
      map.set(self.id, {
        name: self.info?.name || `User ${self.id}`,
        avatar: self.info?.avatar,
      });
    }
    others.forEach(user => {
      map.set(user.id, {
        name: user.info?.name || `User ${user.id}`,
        avatar: user.info?.avatar,
      });
    });
    return map;
  }, [self, others]);

  const handleCreateComment = async (content: string) => {
    if (state.mode !== COMMENT || !self) return;

    try {
      const thread = await createComment({
        content,
        x: state.x,
        y: state.y,
        elementId: state.elementId,
        type: state.elementId ? 'element' : 'document',
      });

      if (thread) {
        // Send notification
        await notifyCommentCreated(
          thread.id,
          self.id,
          self.info?.name || `User ${self.id}`,
          content
        );
      }

      setHiddenState();
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  const handleReply = async (threadId: string, content: string) => {
    if (!self) return;

    try {
      await createReply({
        content,
        threadId,
      });

      // Send notification
      await notifyCommentReply(
        threadId,
        self.id,
        self.info?.name || `User ${self.id}`,
        content
      );
    } catch (error) {
      console.error('Failed to create reply:', error);
    }
  };

  const handleResolveThread = async (threadId: string) => {
    if (!self) return;

    try {
      await resolveThread(threadId);
      
      // Send notification
      await notifyThreadResolved(
        threadId,
        self.id,
        self.info?.name || `User ${self.id}`
      );
      
      setActiveThreadId(null);
    } catch (error) {
      console.error('Failed to resolve thread:', error);
    }
  };

  const handleReopenThread = async (threadId: string) => {
    try {
      await reopenThread(threadId);
    } catch (error) {
      console.error('Failed to reopen thread:', error);
    }
  };

  const handleCloseThread = () => {
    setActiveThreadId(null);
  };

  const handleThreadClick = (threadId: string) => {
    setActiveThreadId(threadId);
  };

  return (
    <>
      {/* Comment Input - shown when in COMMENT mode */}
      {state.mode === COMMENT && (
        <CommentInput
          x={state.x}
          y={state.y}
          onSubmit={handleCreateComment}
          onCancel={() => setHiddenState()}
          mentionSuggestions={presentUsers}
        />
      )}

      {/* Thread Bubbles */}
      {threads.map((thread) => {
        const isActive = activeThreadId === thread.id;
        const threadComments = thread.comments.map(comment => {
          let content = '';
          if (comment.body?.content) {
            content = comment.body.content.map(block => {
              if (block.type === 'paragraph' && block.children) {
                return block.children.map(child => {
                  if ('text' in child) {
                    return child.text || '';
                  }
                  return '';
                }).join('');
              }
              return '';
            }).join('\n');
          }

          return {
            id: comment.id,
            threadId: thread.id,
            content,
            authorId: comment.userId || '',
            authorName: userMap.get(comment.userId)?.name || `User ${comment.userId}`,
            authorAvatar: userMap.get(comment.userId)?.avatar,
            createdAt: new Date(comment.createdAt),
            updatedAt: new Date(comment.editedAt || comment.createdAt),
            mentions: [], // TODO: Extract mentions from content
          };
        });

        return (
          <div key={thread.id}>
            {/* Thread indicator */}
            {!isActive && (
              <div
                className={`absolute z-30 cursor-pointer ${
                  thread.metadata.resolved 
                    ? 'w-4 h-4 bg-green-500 rounded-full' 
                    : 'w-6 h-6 bg-blue-500 rounded-full'
                } hover:scale-110 transition-transform`}
                style={{ 
                  left: thread.metadata.x, 
                  top: thread.metadata.y 
                }}
                onClick={() => handleThreadClick(thread.id)}
              >
                {thread.metadata.resolved && (
                  <span className="text-white text-xs flex items-center justify-center w-full h-full">
                    ✓
                  </span>
                )}
              </div>
            )}

            {/* Thread bubble - shown when active */}
            {isActive && (
              <CommentBubble
                thread={{
                  id: thread.id,
                  x: thread.metadata.x,
                  y: thread.metadata.y,
                  elementId: thread.metadata.elementId,
                  type: thread.metadata.type,
                  resolved: thread.metadata.resolved,
                  createdAt: new Date(thread.createdAt),
                  updatedAt: new Date(thread.updatedAt),
                }}
                comments={threadComments}
                x={thread.metadata.x}
                y={thread.metadata.y}
                onReply={(content) => handleReply(thread.id, content)}
                onResolve={() => handleResolveThread(thread.id)}
                onReopen={() => handleReopenThread(thread.id)}
                onClose={handleCloseThread}
              />
            )}
          </div>
        );
      })}
    </>
  );
};