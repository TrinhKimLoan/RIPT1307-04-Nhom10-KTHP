//Bảng điều khiển 
export type UserRole = 'student' | 'teacher' | 'admin';
export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	isLocked?: boolean;
	subscribedTags?: string[];
	notifyOnNewComment?: boolean;
	token?: string;
}
export interface TagCategory {
	id: string;
	name: string;
}
export interface Tag {
	id: string;
	name: string;
	categoryId: string;
}
export interface Post {
	id: string;
	title: string;
	content: string;
	authorId: string;
	createdAt: string;
	tagIds: string[];
	votes: { [userId: string]: 1 | -1 };
	notifyOnNewComment: boolean;
}
export interface Comment {
	id: string;
	postId: string;
	parentCommentId?: string;
	authorId: string;
	content: string;
	createdAt: string;
	votes: { [userId: string]: 1 | -1 };
}
// Kiểu thống kê số lượng bài theo tháng
export interface PostByMonth {
	month: string; // 'YYYY-MM' dạng chuỗi
	count: number;
}
// Kiểu thống kê số lượng bài và bình luận theo tag
export interface TagStats {
	tagId: string;
	postCount: number;
	commentCount: number;
}
// Kiểu thống kê bài đăng nổi bật
export interface FeaturedPost {
	postId: string; // ID của bài đăng
	totalVotes: number; // Tổng số điểm tương tác
	totalComments: number; // Tổng số bình luận
	title: string; // Tiêu đề bài đăng
	authorName: string; // Tên tác giả
	createdAt: string; // Ngày tạo bài đăng
}









//Quản lý người dùng
export type UserStatus = 'active' | 'pending';
export interface SystemUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isLocked?: boolean;
  createdAt: string; // ISO format
  status: 'active';
}
export interface PendingUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  requestedAt: string; // ISO format
  status: 'pending';
}
export type AnyUser = SystemUser | PendingUser;
