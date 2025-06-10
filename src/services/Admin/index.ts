import { getPosts, savePosts } from '../Posts/index';
import type { Post } from '../Posts/typings.d';

// Mở rộng tính năng cho admin
export const searchPostsByTitle = (keyword: string): Post[] => {
  return getPosts().filter((p) => p.title.toLowerCase().includes(keyword.toLowerCase()));
};

export const getVoteCount = (postId: string): number => {
  const post = getPosts().find(p => p.id === postId);
  return post ? Object.values(post.votes).reduce((sum, v) => sum + v, 0) : 0;
};

