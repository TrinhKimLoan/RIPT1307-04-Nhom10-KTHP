import type { User, Post, Comment, Tag } from '@/services/Admin/admin.types';

export const mockUsers: User[] = [
	{
		id: 'u1',
		name: 'Nguyễn Văn A',
		email: 'vana@example.com',
		password: '123456',
		role: 'student',
		subscribedTags: ['t1', 't2'],
		notifyOnNewComment: true,
	},
	{
		id: 'u2',
		name: 'Trần Thị B',
		email: 'thib@example.com',
		password: '123456',
		role: 'teacher',
	},
	{
		id: 'u3',
		name: 'Lê Văn C',
		email: 'c@gmail.com',
		password: '123456',
		role: 'teacher',
	},
	{
		id: 'u4',
		name: 'Nguyễn Văn D',
		email: 'dd@gmail.com',
		password: '123456',
		role: 'student',
	},
];

export const mockTags: Tag[] = [
	{ id: 't1', name: 'React', categoryId: 'c1' },
	{ id: 't2', name: 'TypeScript', categoryId: 'c1' },
	{ id: 't3', name: 'UI/UX', categoryId: 'c2' },
];

export const mockPosts: Post[] = [
	{
		id: 'p1',
		title: 'Hướng dẫn React cơ bản',
		content: 'Đây là bài viết hướng dẫn React cơ bản...',
		authorId: 'u1',
		createdAt: new Date('2025-05-01').toISOString(),
		tagIds: ['t1'],
		votes: { u2: 1 },
		notifyOnNewComment: true,
	},
	{
		id: 'p2',
		title: 'Làm sao để học TypeScript nhanh?',
		content: 'Nội dung bài viết giúp bạn học TypeScript hiệu quả...',
		authorId: 'u2',
		createdAt: new Date('2025-06-01').toISOString(),
		tagIds: ['t2'],
		votes: {},
		notifyOnNewComment: false,
	},
	{
		id: 'p3',
		title: 'Tìm hiểu về React ',
		content: 'Nội dung bài viết giúp bạn học TypeScript hiệu quả...',
		authorId: 'u3',
		createdAt: new Date('2025-04-02').toISOString(),
		tagIds: ['t3'],
		votes: {},
		notifyOnNewComment: false,
	},
	{
		id: 'p4',
		title: 'Tài liệu học Toán rời rạc',
		content: 'Có ai có tài liệu học Toán rời rạc không?',
		authorId: 'u3',
		createdAt: new Date('2025-04-03').toISOString(),
		tagIds: ['t3'],
		votes: {},
		notifyOnNewComment: false,
	},
	{
		id: 'p5',
		title: 'Tài liệu học React',
		content: 'Có ai có tài liệu học react không?',
		authorId: 'u3',
		createdAt: new Date('2025-04-07').toISOString(),
		tagIds: ['t3'],
		votes: {},
		notifyOnNewComment: false,
	},
];

export const mockComments: Comment[] = [
	{
		id: 'c1',
		postId: 'p1',
		authorId: 'u2',
		content: 'Bài viết rất hữu ích, cảm ơn bạn!',
		createdAt: new Date('2025-05-02').toISOString(),
		votes: { u1: 1 },
	},
];

export const postByMonthMockData = [
	{ month: '2025-01' },
	{ month: '2025-02' },
	{ month: '2025-03' },
	{ month: '2025-04' },
	{ month: '2025-05' },
	{ month: '2025-06' },
];

export function seedMockDataToLocalStorage() {
	localStorage.setItem('users', JSON.stringify(mockUsers));
	localStorage.setItem('posts', JSON.stringify(mockPosts));
	localStorage.setItem('comments', JSON.stringify(mockComments));
	localStorage.setItem('tags', JSON.stringify(mockTags));
}
