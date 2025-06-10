import type { Tags, TagCategory } from './typings';

const TAGS_KEY = 'tags';
const TAG_CATEGORIES_KEY = 'tagCategories';

// Tag operations
export const getTags = (): Tags[] => {
  const data = localStorage.getItem(TAGS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTags = (tags: Tags[]) => localStorage.setItem(TAGS_KEY, JSON.stringify(tags));

// TagCategory operations
export const getTagCategories = (): TagCategory[] => {
  const data = localStorage.getItem(TAG_CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
};
export const saveTagCategories = (categories: TagCategory[]) => localStorage.setItem(TAG_CATEGORIES_KEY, JSON.stringify(categories));

export const createTag = (tag: Omit<Tags, 'id'>): Tags => {
  const tags = getTags();
  const newTag: Tags = {
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

export const updateTag = (tag: Tags) => {
  const tags = getTags().map(t => t.id === tag.id ? tag : t);
  localStorage.setItem(TAGS_KEY, JSON.stringify(tags));
};