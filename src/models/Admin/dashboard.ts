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
	deleteTagCategory,
} from '@/services/Admin/dashboard';
import type { Post, Tag, TagCategory } from '@/services/Admin/admin.types';

export default () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [tagCategories, setTagCategories] = useState<TagCategory[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const [editorVisible, setEditorVisible] = useState(false);
	const [currentPost, setCurrentPost] = useState<Post | null>(null);

	// Load ban đầu
	const loadInitialData = () => {
		setPosts(getPosts());
		setTagCategories(getTagCategories());
	};

	const reloadPosts = () => setPosts(getPosts());
	const reloadTagCategories = () => setTagCategories(getTagCategories());
	const loadTagsByCategory = (categoryId: string) => setTags(getTagsByCategory(categoryId));

	const handleSavePost = (data: Omit<Post, 'id' | 'createdAt' | 'votes'>): boolean => {
		try {
			if (currentPost) {
				updatePostService(currentPost.id, data);
			} else {
				createPostService(data);
			}
			setEditorVisible(false);
			reloadPosts();
			return true;
		} catch (err) {
			console.error('Lỗi khi lưu bài viết:', err);
			return false;
		}
	};

	const startEditPost = (post: Post) => {
		setCurrentPost(post);
		setEditorVisible(true);
	};

	const startNewPost = () => {
		setCurrentPost(null);
		setEditorVisible(true);
	};

	const handleCreateTag = (name: string, categoryId: string) => {
		const newTag = createTag({ name, categoryId });
		loadTagsByCategory(categoryId);
		return newTag;
	};

	const handleCreateCategory = (name: string) => {
		const newCategory = createTagCategory({ name });
		setTagCategories([...tagCategories, newCategory]);
		return newCategory;
	};

	const handleDeletePost = (id: string) => {
		deletePostService(id);
		reloadPosts();
	};

	const handleDeleteTag = (id: string) => {
		const tag = tags.find((t) => t.id === id);
		deleteTag(id);
		if (tag?.categoryId) {
			loadTagsByCategory(tag.categoryId);
		}
	};

	const handleDeleteCategory = (id: string) => {
		deleteTagCategory(id);
		reloadTagCategories();
	};

	return {
		posts,
		tagCategories,
		tags,
		editorVisible,
		currentPost,

		setEditorVisible,
		startEditPost,
		startNewPost,
		handleSavePost,

		loadInitialData,
		reloadPosts,
		reloadTagCategories,
		loadTagsByCategory,

		handleCreateTag,
		handleCreateCategory,
		handleDeletePost,
		handleDeleteTag,
		handleDeleteCategory,
	};
};
