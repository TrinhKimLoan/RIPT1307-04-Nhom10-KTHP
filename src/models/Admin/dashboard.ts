import { useState, useEffect } from 'react';
import { getUsers, getPosts, getComments } from '@/services/Admin/dashboard';

import type { Post, Comment, User, Tag, PostByMonth, TagStats } from '@/services/Admin/admin.types';

/** Tính tổng số user phân theo role */
function calculateUserCountByRole(users: User[]) {
	return users.reduce(
		(acc, user) => {
			if (user.role === 'student') acc.students += 1;
			else if (user.role === 'teacher') acc.teachers += 1;
			return acc;
		},
		{ students: 0, teachers: 0 },
	);
}

/** Tính tổng số bài đăng */
function calculateTotalPosts(posts: Post[]) {
	return posts.length;
}

/** Tính tổng số bình luận */
function calculateTotalComments(comments: Comment[]) {
	return comments.length;
}

/** Tính thống kê bài đăng theo tháng (YYYY-MM) */
function calculatePostByMonth(posts: Post[]): PostByMonth[] {
	const map: Record<string, number> = {};
	posts.forEach((post) => {
		const date = new Date(post.createdAt);
		const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
		map[key] = (map[key] || 0) + 1;
	});
	return Object.entries(map)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([month, count]) => ({ month, count }));
}

/** Tính số bài và bình luận theo tag */
function calculateTagStats(posts: Post[], comments: Comment[], tags: Tag[]): TagStats[] {
	const postCountMap: Record<string, number> = {};
	const commentCountMap: Record<string, number> = {};

	// Đếm bài theo tag
	posts.forEach((post) => {
		post.tagIds.forEach((tagId) => {
			postCountMap[tagId] = (postCountMap[tagId] || 0) + 1;
		});
	});

	// Đếm bình luận theo tag
	// Bình luận liên quan đến bài có tag đó
	comments.forEach((comment) => {
		const post = posts.find((p) => p.id === comment.postId);
		if (post) {
			post.tagIds.forEach((tagId) => {
				commentCountMap[tagId] = (commentCountMap[tagId] || 0) + 1;
			});
		}
	});

	return tags.map((tag) => ({
		tagId: tag.id,
		postCount: postCountMap[tag.id] || 0,
		commentCount: commentCountMap[tag.id] || 0,
	}));
}

/** Lấy các bài đăng nổi bật theo tổng lượt tương tác (votes) */
function getTopPosts(posts: Post[], topN = 5) {
	const postsWithScore = posts.map((post) => {
		const voteSum = Object.values(post.votes || {}).reduce((a, b) => a + b, 0);
		return { ...post, score: voteSum };
	});
	postsWithScore.sort((a, b) => b.score - a.score);
	return postsWithScore.slice(0, topN);
}

//useModel
export function useDashboardModel() {
	// Dữ liệu localStorage
	const [users, setUsers] = useState<User[]>([]);
	const [posts, setPosts] = useState<Post[]>([]);
	const [comments, setComments] = useState<Comment[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);

	// Load dữ liệu từ localStorage khi mount
	useEffect(() => {
		setUsers(getUsers());
		setPosts(getPosts());
		setComments(getComments());

		// Giả sử tags cũng lưu localStorage (key: 'tags')
		const rawTags = localStorage.getItem('tags');
		if (rawTags) setTags(JSON.parse(rawTags));
		else setTags([]);
	}, []);

	// Tính toán dữ liệu để UI hiển thị
	const userCounts = calculateUserCountByRole(users);
	const totalPosts = calculateTotalPosts(posts);
	const totalComments = calculateTotalComments(comments);
	const postByMonth = calculatePostByMonth(posts);
	const tagStats = calculateTagStats(posts, comments, tags);
	const topPosts = getTopPosts(posts, 5);

	return {
		users,
		posts,
		comments,
		tags,
		userCounts,
		totalPosts,
		totalComments,
		postByMonth,
		tagStats,
		topPosts,
	};
}


