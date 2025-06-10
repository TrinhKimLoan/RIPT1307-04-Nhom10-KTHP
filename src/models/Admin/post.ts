// src/models/post.ts
import { useState, useCallback } from 'react';
import type {
	Post,
	CreatePostPayload,
	EditPostPayload,
	AddCommentPayload,
	VoteType,
	Comment,
} from '@/services/Admin/admin.types';
import * as postService from '@/services/Admin/post';

export default function () {
	const [posts, setPosts] = useState<Post[]>(() => postService.getPosts());

	const refreshPosts = useCallback(() => {
		setPosts(postService.getPosts());
	}, []);

	// Thêm bài viết
	const addPost = useCallback(
		(payload: CreatePostPayload): Post => {
			const newPost = postService.createPost(payload);
			refreshPosts();
			return newPost;
		},
		[refreshPosts],
	);

	// Sửa bài viết
	const updatePost = useCallback(
		(payload: EditPostPayload): void => {
			postService.editPost(payload);
			refreshPosts();
		},
		[refreshPosts],
	);

	// Xóa bài viết
	const deletePost = useCallback(
		(id: string) => {
			postService.deletePost(id);
			refreshPosts();
		},
		[refreshPosts],
	);

	// Bình chọn
	const votePost = useCallback(
		(postId: string, userId: string, vote: VoteType) => {
			postService.addVote(postId, userId, vote);
			refreshPosts();
		},
		[refreshPosts],
	);

	// Tìm kiếm và lọc
	const searchPosts = (keyword: string): Post[] => {
		return postService.searchPostsByTitle(keyword);
	};

	const filterByTag = (tagId: string): Post[] => {
		return postService.filterPostsByTag(tagId);
	};

	// Bình luận
	const addComment = (payload: AddCommentPayload) => {
		postService.addComment(payload);
		refreshPosts();
	};

	const getComments = (postId: string): Comment[] => {
		return postService.getPostComments(postId);
	};

	const getVoteCount = postService.getVoteCount;
	const getCommentCount = postService.getCommentCount;

	return {
		posts,
		refreshPosts,

		addPost,
		updatePost,
		deletePost,

		votePost,

		searchPosts,
		filterByTag,

		addComment,
		getComments,

		getVoteCount,
		getCommentCount,
	};
}
