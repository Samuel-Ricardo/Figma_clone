'use client';

import { ICommentInputProps } from '@/@types/props/comment/components.type';
import { useState, useRef, useEffect } from 'react';

export const CommentInput = ({
  x,
  y,
  onSubmit,
  onCancel,
  placeholder = 'Add a comment...',
  mentionSuggestions = [],
}: ICommentInputProps) => {
  const [content, setContent] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);

    // Check for @ mentions
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === value.length - 1) {
      setShowMentions(true);
      setMentionQuery('');
    } else if (atIndex !== -1 && value.charAt(atIndex - 1) === ' ') {
      const query = value.slice(atIndex + 1);
      if (query.length > 0 && !query.includes(' ')) {
        setShowMentions(true);
        setMentionQuery(query);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[280px]"
      style={{ left: x, top: y }}
    >
      <textarea
        ref={inputRef}
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full h-20 resize-none border-none outline-none text-sm"
        maxLength={500}
      />
      
      {showMentions && mentionSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-32 overflow-y-auto">
          {mentionSuggestions
            .filter(user => 
              user.name.toLowerCase().includes(mentionQuery.toLowerCase())
            )
            .slice(0, 5)
            .map(user => (
              <div
                key={user.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  const atIndex = content.lastIndexOf('@');
                  const newContent = content.slice(0, atIndex) + `@${user.name} `;
                  setContent(newContent);
                  setShowMentions(false);
                  inputRef.current?.focus();
                }}
              >
                <div className="flex items-center gap-2">
                  {user.avatar && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-4 h-4 rounded-full"
                    />
                  )}
                  <span>{user.name}</span>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          Comment
        </button>
      </div>
    </div>
  );
};