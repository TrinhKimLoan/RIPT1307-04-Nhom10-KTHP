import { Post } from '@/models/forumModels';

const KEY = 'posts';

export const getPosts = (): Post[] => JSON.parse(localStorage.getItem(KEY) || '[]');
export const savePosts = (posts: Post[]) => localStorage.setItem(KEY, JSON.stringify(posts));

export const addPost = (post: Post) => {
  const posts = getPosts();
  savePosts([...posts, post]);
};

export const updatePost = (post: Post) => {
  const posts = getPosts().map(p => p.id === post.id ? post : p);
  savePosts(posts);
};

export const getPostById = (id: string): Post | undefined => getPosts().find(p => p.id === id);
