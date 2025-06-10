import type { Comment } from './typings.d';
import { sendEmailOnNewComment } from '../emailServices';
import { getPostById } from '@/services/Posts';
import { getUserById } from '@/services/Users';
const STORAGE_KEY = 'comments';

export const getComments = (): Comment[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveComments = (comments: Comment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
};

// export const addComment = (comment: Comment) => {
//   const updated = [...getComments(), comment];
//   saveComments(updated);
// };
export const addComment = (comment: Comment) => {
  const comments = getComments();
  comments.push(comment);
  saveComments(comments);

  // Gửi email nếu người viết bài đăng bật notify
  const post = getPostById(comment.postId);
  if (post?.notifyOnNewComment) {
    const author = getUserById(post.authorId);
    if (author) {
      sendEmailOnNewComment(post, author);
    }
  }
};

export const updateComment = (comment: Comment) => {
  const updated = getComments().map((c) => (c.id === comment.id ? comment : c));
  saveComments(updated);
};

export const deleteComment = (commentId: string) => {
  const updated = getComments().filter((c) => c.id !== commentId);
  saveComments(updated);
};

export const getCommentsByPostId = (postId: string) =>
  getComments().filter((c) => c.postId === postId);

// Thêm hàm vote cho comment
export const voteComment = (commentId: string, userId: string, vote: 1 | -1) => {
  const all = getComments();
  const idx = all.findIndex(c => c.id === commentId);
  if (idx === -1) return;
  const c = all[idx];
  if (c.votes[userId] === vote) {
    delete c.votes[userId];
  } else {
    c.votes[userId] = vote;
  }
  all[idx] = c;
  saveComments(all);
  return c;
};
