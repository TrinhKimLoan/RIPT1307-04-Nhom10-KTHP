import { useState } from 'react';
import { getUsers, getPosts, getComments } from '@/services/Admin/dashboard';

import type { Post, Comment, User, Tag, PostByMonth, TagStats } from '@/services/Admin/admin.types';

/** 
 * Tính tổng số user phân theo role (student/teacher) 
 * Trả về: { students: number, teachers: number }
 */
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

/** 
 * Tính tổng số bài đăng trong hệ thống 
 */
function calculateTotalPosts(posts: Post[]) {
	return posts.length;
}

/** 
 * Tính tổng số bình luận trong hệ thống 
 */
function calculateTotalComments(comments: Comment[]) {
	return comments.length;
}

/** 
 * Tính thống kê số bài đăng theo từng tháng (dạng YYYY-MM) 
 * Trả về mảng { month: string, count: number }
 */
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

/**
 * Tính thống kê theo từng tag:
 * - Tổng số bài viết sử dụng tag đó
 * - Tổng số bình luận của các bài viết có tag đó
 */
function calculateTagStats(posts: Post[], comments: Comment[], tags: Tag[]): TagStats[] {
	const postCountMap: Record<string, number> = {};
	const commentCountMap: Record<string, number> = {};

	// Đếm số bài theo tag
	posts.forEach((post) => {
		post.tagIds.forEach((tagId) => {
			postCountMap[tagId] = (postCountMap[tagId] || 0) + 1;
		});
	});

	// Đếm số bình luận theo tag (bình luận của các bài có tag)
	comments.forEach((comment) => {
		const post = posts.find((p) => p.id === comment.postId);
		if (post) {
			post.tagIds.forEach((tagId) => {
				commentCountMap[tagId] = (commentCountMap[tagId] || 0) + 1;
			});
		}
	});

	// Tổng hợp kết quả theo từng tag
	return tags.map((tag) => ({
		tagId: tag.id,
		postCount: postCountMap[tag.id] || 0,
		commentCount: commentCountMap[tag.id] || 0,
	}));
}

/**
 * Trả về danh sách các bài đăng nổi bật nhất theo tổng số vote
 * Mặc định lấy top 5
 */
function getTopPosts(posts: Post[], topN = 5) {
	const postsWithScore = posts.map((post) => {
		const voteSum = Object.values(post.votes || {}).reduce((a, b) => a + b, 0);
		return { ...post, score: voteSum };
	});
	postsWithScore.sort((a, b) => b.score - a.score);
	return postsWithScore.slice(0, topN);
}

/**
 * Hàm khởi tạo dữ liệu ban đầu cho dashboard từ localStorage
 * Gồm: danh sách users, posts, comments, tags
 */
function initDashboardModel() {
	const users = getUsers(); // từ service
	const posts = getPosts(); // từ service
	const comments = getComments(); // từ service

	// Lấy dữ liệu tags từ localStorage
	const rawTags = localStorage.getItem('tags');
	const tags: Tag[] = rawTags ? JSON.parse(rawTags) : [];

	return { users, posts, comments, tags };
}

/**
 * useDashboardModel:
 * Custom hook cung cấp toàn bộ dữ liệu đã tính toán cho dashboard
 * KHÔNG sử dụng useEffect – chỉ load một lần khi component mount
 */
export function useDashboardModel() {
	// Dữ liệu khởi tạo từ localStorage
	const { users, posts, comments, tags } = initDashboardModel();

	// Lưu vào useState để hỗ trợ re-render khi cần
	const [userState] = useState(users);
	const [postState] = useState(posts);
	const [commentState] = useState(comments);
	const [tagState] = useState(tags);

	// Dữ liệu thống kê phục vụ UI
	const userCounts = calculateUserCountByRole(userState);
	const totalPosts = calculateTotalPosts(postState);
	const totalComments = calculateTotalComments(commentState);
	const postByMonth = calculatePostByMonth(postState);
	const tagStats = calculateTagStats(postState, commentState, tagState);
	const topPosts = getTopPosts(postState, 5);

	// Trả ra tất cả dữ liệu cần thiết
	return {
		users: userState,
		posts: postState,
		comments: commentState,
		tags: tagState,
		userCounts,
		totalPosts,
		totalComments,
		postByMonth,
		tagStats,
		topPosts,
	};
}
