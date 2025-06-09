import { Tags, TagCategory } from './typings';

const STORAGE_KEY = 'tags';

export const getTags = (): Tags[] => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
export const getCategories = (): TagCategory[] => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

export const addTag = (tag: Tags) => {
  const tags = getTags();
  tags.push(tag);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
};
export const updateTag = (tag: Tags) => {
  const tags = getTags().map(t => t.id === tag.id ? tag : t);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
};
export const deleteTag = (id: string) => {
  const tags = getTags().filter(t => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
};

export const addCategory = (category: TagCategory) => {
  const categories = getCategories();
  localStorage.setItem('STORAGE_KEY', JSON.stringify([...categories, category]));
};
