import type { Post} from './typings';
import { getUsers } from '@/services/Users'; // dùng nếu cần
import { sendEmailOnNewPost } from '../emailServices';

const POSTS_KEY = 'posts';

// Post operations
export const getPosts = (): Post[] => {
  const data = localStorage.getItem(POSTS_KEY);
  return data ? JSON.parse(data) : [];
};
export const savePosts = (posts: Post[]) => localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

// CRUD functions
export const createPost = (post: Omit<Post, 'id' | 'createdAt' | 'votes'>): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    votes: {}
  };
  savePosts([...posts, newPost]);
  // Gửi email ở đây
  const users = getUsers();
  sendEmailOnNewPost(newPost, users);
  return newPost;
};

export const updatePost = (id: string, updates: Partial<Post>): Post | null => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  const updatedPost = { ...posts[index], ...updates };
  posts[index] = updatedPost;
  savePosts(posts);
  return updatedPost;
};

export const deletePost = (id: string) => {
  savePosts(getPosts().filter(post => post.id !== id));
};

export const votePost = (postId: string, userId: string, vote: 1 | -1) => {
  const posts = getPosts();
  const idx = posts.findIndex(p => p.id === postId);
  if (idx === -1) return;
  const p = posts[idx];
  // Nếu vote trùng thì bỏ vote (toggle off)
  if (p.votes[userId] === vote) {
    delete p.votes[userId];
  } else {
    p.votes[userId] = vote;
  }
  posts[idx] = p;
  savePosts(posts);
  return p;
};

export const getPostById = (id: string) => {
  const posts = getPosts(); // Lấy tất cả bài viết từ localStorage
  return posts.find(post => post.id === id);
};