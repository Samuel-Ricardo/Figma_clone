export interface ICommentThread {
  id: string;
  x: number;
  y: number;
  elementId?: string;
  type: 'document' | 'element';
  resolved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: string;
  threadId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
  mentions: string[];
}

export interface ICommentReply extends Omit<IComment, 'threadId'> {
  parentCommentId: string;
}

export interface ICreateCommentData {
  content: string;
  x: number;
  y: number;
  elementId?: string;
  type: 'document' | 'element';
  mentions?: string[];
}

export interface ICreateReplyData {
  content: string;
  threadId: string;
  parentCommentId?: string;
  mentions?: string[];
}