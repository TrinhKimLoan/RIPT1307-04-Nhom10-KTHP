import { Comment } from './typings';

const KEY = 'comments';

export const getComments = (): Comment[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};
export const saveComments = (comments: Comment[]) => localStorage.setItem(KEY, JSON.stringify(comments));

export const addComment = (newComment: Comment): void => {
  const comments = getComments();
  comments.push(newComment);
  localStorage.setItem(KEY, JSON.stringify(comments));
};

export const updateComment = (id: string, content: string): void => {
  const comments = getComments().map(c =>
    c.id === id ? { ...c, content } : c
  );
  localStorage.setItem(KEY, JSON.stringify(comments));
};

export const deleteComment = (id: string): void => {
  const comments = getComments().filter(c => c.id !== id && c.parentCommentId !== id);
  localStorage.setItem(KEY, JSON.stringify(comments));
};

export const voteComment = (id: string): void => {
  const key = `voted_comment_${id}`;
  if (localStorage.getItem(key)) return; // only vote once

  const comments = getComments().map(c =>
    c.id === id ? { ...c, votes: 1 } : c
  );
  localStorage.setItem(KEY, JSON.stringify(comments));
  localStorage.setItem(key, 'true');
};

export const getCommentsByPostId = (postId: string) =>
  getComments().filter(c => c.postId === postId);
