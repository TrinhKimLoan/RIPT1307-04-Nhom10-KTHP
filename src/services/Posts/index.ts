import type { Post, Tag, TagCategory } from './typings';

const POSTS_KEY = 'posts';
const TAGS_KEY = 'tags';
const TAG_CATEGORIES_KEY = 'tagCategories';

// Post operations
export const getPosts = (): Post[] => {
  const data = localStorage.getItem(POSTS_KEY);
  return data ? JSON.parse(data) : [];
};
export const savePosts = (posts: Post[]) => localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

// Tag operations
export const getTags = (): Tag[] => {
  const data = localStorage.getItem(TAGS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTags = (tags: Tag[]) => localStorage.setItem(TAGS_KEY, JSON.stringify(tags));

// TagCategory operations
export const getTagCategories = (): TagCategory[] => {
  const data = localStorage.getItem(TAG_CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};
export const saveTagCategories = (categories: TagCategory[]) => localStorage.setItem(TAG_CATEGORIES_KEY, JSON.stringify(categories));

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

export const createTag = (tag: Omit<Tag, 'id'>): Tag => {
  const tags = getTags();
  const newTag: Tag = {
    ...tag,
    id: Date.now().toString()
  };
  saveTags([...tags, newTag]);
  return newTag;
};

export const createTagCategory = (category: Omit<TagCategory, 'id'>): TagCategory => {
  const categories = getTagCategories();
  const newCategory: TagCategory = {
    ...category,
    id: Date.now().toString()
  };
  saveTagCategories([...categories, newCategory]);
  return newCategory;
};

// Helper functions
export const getTagsByCategory = (categoryId: string) => getTags().filter(tag => tag.categoryId === categoryId);
export const getTagCategoryByName = (name: string) => getTagCategories().find(c => c.name === name);

// Thêm hàm xóa tag (nếu cần)
export const deleteTag = (id: string) => {
  const tags = getTags();
  const updatedTags = tags.filter(tag => tag.id !== id);
  saveTags(updatedTags);
};

// Thêm hàm xóa phân loại tag
export const deleteTagCategory = (id: string) => {
  const categories = getTagCategories();
  const updatedCategories = categories.filter(category => category.id !== id);
  saveTagCategories(updatedCategories);
};