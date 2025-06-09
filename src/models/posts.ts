import { useState } from 'react';
import { 
  getPosts, 
  createPost as createPostService, 
  updatePost as updatePostService,
  deletePost as deletePostService,
  getTagCategories,
  getTagsByCategory,
  createTag,
  createTagCategory,
  deleteTag,
  deleteTagCategory
} from '@/services/Posts/index';
import type { Post, Tag, TagCategory } from '@/services/Posts/typings';

export default () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [editorVisible, setEditorVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

    // Hàm load dữ liệu ban đầu
  const loadInitialData = () => {
    setPosts(getPosts());
    setTagCategories(getTagCategories());
  };
  
  const loadPosts = () => setPosts(getPosts());
  const loadTagCategories = () => setTagCategories(getTagCategories());
  
  const loadTagsForCategory = (categoryId: string) => {
    setTags(getTagsByCategory(categoryId));
  };

  const savePost = (postData: Omit<Post, 'id' | 'createdAt' | 'votes'>): boolean => {
  try {
    if (currentPost) {
      updatePostService(currentPost.id, postData);
    } else {
      createPostService(postData);
    }
    setEditorVisible(false);
    loadPosts();
    return true; // Trả về true nếu thành công
  } catch (error) {
    console.error('Lỗi khi lưu bài đăng:', error);
    return false; // Trả về false nếu thất bại
  }
};

  const editPost = (post: Post) => {
    setCurrentPost(post);
    setEditorVisible(true);
  };

  const newPost = () => {
    setCurrentPost(null);
    setEditorVisible(true);
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

  // Thêm hàm xóa bài
  const removePost = (id: string) => {
    deletePostService(id);
    loadPosts(); // Tải lại danh sách sau khi xóa
  };

  // Thêm hàm xóa tag
  const removeTag = (id: string) => {
    deleteTag(id);
    // Cập nhật lại danh sách tag nếu đang ở chế độ chỉnh sửa
    if (currentPost) {
      setTags(getTagsByCategory(currentPost.tagCategoryId));
    }
  };

  // Thêm hàm xóa phân loại tag
  const removeTagCategory = (id: string) => {
    deleteTagCategory(id);
    loadTagCategories(); // Tải lại danh sách phân loại
  };

  return {
    loadInitialData,
    posts,
    tagCategories,
    tags,
    editorVisible,
    currentPost,
    loadPosts,
    loadTagCategories,
    loadTagsForCategory,
    savePost,
    editPost,
    newPost,
    setEditorVisible,
    handleCreateTag,
    handleCreateTagCategory,
    removePost,
    removeTag,
    removeTagCategory
  };
};