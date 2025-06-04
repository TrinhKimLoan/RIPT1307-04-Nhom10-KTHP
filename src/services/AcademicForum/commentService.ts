import { Comment } from '@/models/forumModels';

const KEY = 'comments';

export const getComments = (): Comment[] => JSON.parse(localStorage.getItem(KEY) || '[]');
export const saveComments = (comments: Comment[]) => localStorage.setItem(KEY, JSON.stringify(comments));

export const addComment = (comment: Comment) => {
  const comments = getComments();
  saveComments([...comments, comment]);
};

export const getCommentsByPostId = (postId: string) =>
  getComments().filter(c => c.postId === postId);
