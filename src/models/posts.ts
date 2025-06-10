import { useState, useEffect, useCallback } from 'react';
import { 
  getPosts, 
  createPost as createPostService, 
  updatePost as updatePostService,
  deletePost as deletePostService,
  votePost,
  getPostById
} from '@/services/Posts/index';
import type { Post } from '@/services/Posts/typings';
import * as postService from '@/services/Comments/index';
import type { Comment } from '@/services/Comments/typings';
import type {CreatePostPayload } from '@/services/Admin/admin.types';
import { createPost } from '@/services/Posts/index';

export default () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editorVisible, setEditorVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  
  const refreshPosts = () => setPosts(getPosts());
  
  useEffect(() => refreshPosts(), []);

  // Hàm load dữ liệu ban đầu
  const loadInitialData = () => {
    setPosts(getPosts());
  };
  
  const loadPosts = () => setPosts(getPosts());

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

  // Thêm hàm xóa bài
  const removePost = (id: string) => {
    deletePostService(id);
    loadPosts(); // Tải lại danh sách sau khi xóa
  };

  const updatePost = (updatedPost: Post) => {
  updatePostService(updatedPost.id, updatedPost);
  loadPosts(); // Refresh lại danh sách
  };

  const getById = (id: string): Post | undefined => {
  return posts.find(p => p.id === id);
  };

  const fetchPosts = () => {
    const stored = getPosts(); // lấy từ localStorage
    setPosts(stored);
  };

  const vote = (postId: string, userId: string, voteValue: 1 | -1) => {
    const updated = votePost(postId, userId, voteValue);
    if (updated) {
      setPosts(getPosts());
    }
  };

  const fetchById = (id: string) => {
    const post = getPostById(id);
    if (post) {
      // Cập nhật state
      setPosts(prev => {
        const existing = prev.find(p => p.id === id);
        if (existing) {
          return prev.map(p => p.id === id ? post : p);
        } else {
          return [...prev, post];
        }
      });
    }
  };
  // 1 số hàm của Admin
  const getComments = (postId: string): Comment[] => {
		return postService.getPostComments(postId);
	};
  // Thêm bài viết
	const addPost = useCallback(
		(payload: CreatePostPayload): Post => {
			const newPost2 = createPost(payload);
			refreshPosts();
			return newPost2;
		},
		[refreshPosts],
	);

  const getCommentCount = postService.getCommentCount;

  return {
    loadInitialData,
    setCurrentPost,
    refreshPosts,
    posts,
    editorVisible,
    currentPost,
    loadPosts,
    savePost,
    editPost,
    newPost,
    setEditorVisible,
    removePost,
    updatePost,
    getById,
    fetchPosts,
    vote,
    fetchById,
    getComments,
    addPost,
    getCommentCount
  };
};