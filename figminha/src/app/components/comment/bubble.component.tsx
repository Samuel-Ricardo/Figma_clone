'use client';

import { ICommentBubbleProps } from '@/@types/props/comment/components.type';
import { useState } from 'react';
import { CommentInput } from './input.component';

export const CommentBubble = ({
  thread,
  comments,
  x,
  y,
  onReply,
  onResolve,
  onReopen,
  onClose,
}: ICommentBubbleProps) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isMinimized, setIsMinimized] = useState(thread.resolved);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleReply = (content: string) => {
    onReply(content);
    setShowReplyInput(false);
  };

  const toggleResolved = () => {
    if (thread.resolved) {
      onReopen();
      setIsMinimized(false);
    } else {
      onResolve();
      setIsMinimized(true);
    }
  };

  if (isMinimized && thread.resolved) {
    return (
      <div
        className="absolute z-40 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200"
        style={{ left: x, top: y }}
        onClick={() => setIsMinimized(false)}
      >
        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute z-40 bg-white rounded-lg shadow-lg border border-gray-200 min-w-[300px] max-w-[400px]"
      style={{ left: x, top: y }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${thread.resolved ? 'bg-green-500' : 'bg-blue-500'}`} />
          <span className="text-sm font-medium">
            {thread.type === 'element' ? 'Element Comment' : 'Document Comment'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleResolved}
            className={`text-xs px-2 py-1 rounded ${
              thread.resolved 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {thread.resolved ? 'Resolved' : 'Resolve'}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-1"
          >
            ×
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="p-3 border-b border-gray-50 last:border-b-0">
            <div className="flex items-start gap-3">
              {comment.authorAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={comment.authorAvatar}
                  alt={comment.authorName}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {comment.content}
                </p>
                {comment.mentions.length > 0 && (
                  <div className="mt-1">
                    {comment.mentions.map((mention) => (
                      <span key={mention} className="text-xs text-blue-600 mr-1">
                        @{mention}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Section */}
      {!thread.resolved && (
        <div className="p-3 border-t border-gray-100">
          {showReplyInput ? (
            <CommentInput
              x={0}
              y={0}
              onSubmit={handleReply}
              onCancel={() => setShowReplyInput(false)}
              placeholder="Reply to this thread..."
            />
          ) : (
            <button
              onClick={() => setShowReplyInput(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Reply
            </button>
          )}
        </div>
      )}
    </div>
  );
};