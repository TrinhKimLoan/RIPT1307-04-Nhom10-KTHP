import { useState } from 'react';
import {
      getTagCategories,
      getTagsByCategory,
      createTag,
      createTagCategory, 
      deleteTagCategory,
      getTags
} from '@/services/Tags/index';

import type {Tags, TagCategory} from '@/services/Tags/typings';

export default() => {
    const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);
    const [tags, setTags] = useState<Tags[]>([]);

    const loadInitialData = () => {
        setTagCategories(getTagCategories());
    };
    const loadTagCategories = () => setTagCategories(getTagCategories());

    const loadTagsForCategory = (categoryId: string) => {
        setTags(getTagsByCategory(categoryId));
    };

    const handleCreateTag = (tagName: string, categoryId: string) => {
        const newTag = createTag({ name: tagName, categoryId });
        loadTagsForCategory(categoryId);
        return newTag;
    };

    const handleCreateTagCategory = (categoryName: string) => {
        const newCategory = createTagCategory({ name: categoryName });
        setTagCategories([...tagCategories, newCategory]);
        return newCategory;
    };

    // Thêm hàm xóa phân loại tag
    const removeTagCategory = (id: string) => {
        deleteTagCategory(id);
        loadTagCategories(); // Tải lại danh sách phân loại
    };

    const fetchTagCategories = async () => {
        const res = getTagCategories(); // lấy từ services
        setTagCategories(res);
    };

    const fetchTag = () => {
        const sth = getTags();
        setTags(sth);
    };
    const getByCategory = (categoryId: string): TagCategory | undefined => {
        return getTagCategories().find(cat => cat.id === categoryId);
    };

    const getByIds = (tagIds: string[]): Tags[] => {
        const allTags = getTags();
        return allTags.filter(tag => tagIds.includes(tag.id));
    };

    return {
        loadInitialData,
        tagCategories,
        tags,
        loadTagCategories,
        loadTagsForCategory,
        handleCreateTag,
        handleCreateTagCategory,
        removeTagCategory,
        fetchTagCategories,
        fetchTag,
        getByCategory,
        getByIds
    };
};