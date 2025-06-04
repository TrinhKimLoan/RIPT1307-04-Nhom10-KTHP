import { Tags, TagCategory } from '@/models/forumModels';

export const getTags = (): Tags[] => JSON.parse(localStorage.getItem('tags') || '[]');
export const getCategories = (): TagCategory[] => JSON.parse(localStorage.getItem('tagCategories') || '[]');

export const addTag = (tag: Tags) => {
  const tags = getTags();
  localStorage.setItem('tags', JSON.stringify([...tags, tag]));
};

export const addCategory = (category: TagCategory) => {
  const categories = getCategories();
  localStorage.setItem('tagCategories', JSON.stringify([...categories, category]));
};
