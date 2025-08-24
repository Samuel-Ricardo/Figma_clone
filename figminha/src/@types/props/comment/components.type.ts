import { ICommentThread, IComment } from '../../comment/thread.type';

export interface ICommentBubbleProps {
  thread: ICommentThread;
  comments: IComment[];
  x: number;
  y: number;
  onReply: (content: string) => void;
  onResolve: () => void;
  onReopen: () => void;
  onClose: () => void;
}

export interface ICommentInputProps {
  x: number;
  y: number;
  onSubmit: (content: string) => void;
  onCancel: () => void;
  placeholder?: string;
  mentionSuggestions?: Array<{ id: string; name: string; avatar?: string }>;
}

export interface ICommentThreadListProps {
  threads: ICommentThread[];
  comments: Record<string, IComment[]>;
  onThreadClick: (thread: ICommentThread) => void;
  onResolveThread: (threadId: string) => void;
}

export interface IMentionSuggestionProps {
  users: Array<{ id: string; name: string; avatar?: string }>;
  onSelect: (user: { id: string; name: string }) => void;
  position: { x: number; y: number };
  visible: boolean;
}