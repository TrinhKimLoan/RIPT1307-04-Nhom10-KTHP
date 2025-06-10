import type { Post, Tag, TagCategory } from '@/services/Admin/admin.types';

const POSTS_KEY = 'posts';
const TAGS_KEY = 'tags';
const TAG_CATEGORIES_KEY = 'tagCategories';

// Getters
export const getPosts = (): Post[] => {
  const data = localStorage.getItem(POSTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getTags = (): Tag[] => {
  const data = localStorage.getItem(TAGS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getTagCategories = (): TagCategory[] => {
  const data = localStorage.getItem(TAG_CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};

// Setters
export const savePosts = (posts: Post[]) =>
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

export const saveTags = (tags: Tag[]) =>
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));

export const saveTagCategories = (categories: TagCategory[]) =>
  localStorage.setItem(TAG_CATEGORIES_KEY, JSON.stringify(categories));

// CRUD: Post
export const createPost = (data: Omit<Post, 'id' | 'createdAt' | 'votes'>): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    votes: {}
  };
  savePosts([...posts, newPost]);
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

// CRUD: Tag
export const createTag = (data: Omit<Tag, 'id'>): Tag => {
  const tags = getTags();
  const newTag: Tag = { ...data, id: Date.now().toString() };
  saveTags([...tags, newTag]);
  return newTag;
};

export const deleteTag = (id: string) => {
  const updated = getTags().filter(tag => tag.id !== id);
  saveTags(updated);
};

// CRUD: Tag Category
export const createTagCategory = (data: Omit<TagCategory, 'id'>): TagCategory => {
  const categories = getTagCategories();
  const newCategory: TagCategory = { ...data, id: Date.now().toString() };
  saveTagCategories([...categories, newCategory]);
  return newCategory;
};

export const deleteTagCategory = (id: string) => {
  const updated = getTagCategories().filter(c => c.id !== id);
  saveTagCategories(updated);
};

// Helpers
export const getTagsByCategory = (categoryId: string) =>
  getTags().filter(tag => tag.categoryId === categoryId);

export const getTagCategoryByName = (name: string) =>
  getTagCategories().find(c => c.name === name);
