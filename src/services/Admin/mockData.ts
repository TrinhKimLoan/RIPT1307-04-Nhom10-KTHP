import type { User, Post, Comment, Tag } from '@/services/Admin/admin.types';

//Mock cho dashboard
export const mockUsers: User[] = [
	{
		id: 'u1',
		name: 'Nguyễn Văn A',
		email: 'vana@example.com',
		password: '123456',
		role: 'student',
		subscribedTags: ['t1', 't2'],
		notifyOnNewComment: true,
		status: 'active',
	},
	{
		id: 'u2',
		name: 'Trần Thị B',
		email: 'thib@example.com',
		password: '123456',
		role: 'teacher',
		subscribedTags: ['t1'],
		notifyOnNewComment: false,
		status: 'active',
	},
	{
		id: 'u3',
		name: 'Lê Văn C',
		email: 'c@gmail.com',
		password: '123456',
		role: 'teacher',
		subscribedTags: ['t2', 't3'],
		notifyOnNewComment: true,
		status: 'active',
	},
	{
		id: 'u4',
		name: 'Nguyễn Văn D',
		email: 'dd@gmail.com',
		password: '123456',
		role: 'student',
		subscribedTags: ['t1', 't2'],
		notifyOnNewComment: false,
		status: 'active',
	},
];

// Mock cho các danh mục và thẻ
export const mockTags: Tag[] = [
	{ id: 't1', name: 'React', categoryId: 'c1' },
	{ id: 't2', name: 'TypeScript', categoryId: 'c1' },
	{ id: 't3', name: 'UI/UX', categoryId: 'c2' },
	{ id: 't4', name: 'JavaScript', categoryId: 'c1' },
	{ id: 't5', name: 'CSS', categoryId: 'c2' },
	{ id: 't6', name: 'HTML', categoryId: 'c2' },
	{ id: 't7', name: 'Node.js', categoryId: 'c1' },
	{ id: 't8', name: 'Express.js', categoryId: 'c1' },
	{ id: 't9', name: 'MongoDB', categoryId: 'c3' },
	{ id: 't10', name: 'GraphQL', categoryId: 'c3' },
];

// Mock cho các bài viết
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
	{
		id: 'p5',
		title: 'hehehehehehehehehehe',
		content: 'Có ai không?',
		authorId: 'u3',
		createdAt: new Date('2025-06-13').toISOString(),
		tagIds: ['t3'],
		votes: { u1: 1 },
		notifyOnNewComment: false,
	},
];

// Mock cho các bình luận
export const mockComments: Comment[] = [
	{
		id: 'c1',
		postId: 'p1',
		authorId: 'u2',
		content: 'Bài viết rất hữu ích, cảm ơn bạn!',
		createdAt: new Date('2025-05-02').toISOString(),
		votes: { u1: 1 },
	},
	{
		id: 'c1',
		postId: 'p3',
		authorId: 'u2',
		content: 'Thank kiu nhiều nhen!',
		createdAt: new Date('2025-05-04').toISOString(),
		votes: { u1: 1 },
	},
];

// Mock cho thống kê bài viết theo tháng
export const postByMonthMockData = [
	{ month: '2025-01' },
	{ month: '2025-02' },
	{ month: '2025-03' },
	{ month: '2025-04' },
	{ month: '2025-05' },
	{ month: '2025-06' },
	{ month: '2025-07' },
	{ month: '2025-08' },
	{ month: '2025-09' },
	{ month: '2025-10' },
	{ month: '2025-11' },
	{ month: '2025-12' },
];

// Hàm khởi tạo dữ liệu mẫu vào localStorage
export function seedMockDataToLocalStorage() {
	localStorage.setItem('users', JSON.stringify(mockUsers));
	localStorage.setItem('posts', JSON.stringify(mockPosts));
	localStorage.setItem('comments', JSON.stringify(mockComments));
	localStorage.setItem('tags', JSON.stringify(mockTags));
}
