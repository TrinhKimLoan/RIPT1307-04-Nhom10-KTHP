export type UserRole = 'student' | 'teacher' | 'admin';

// Kiểu người dùng trong hệ thống
export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	isLocked?: boolean; // Trạng thái khóa tài khoản, true nếu bị khóa
	subscribedTags?: string[]; // Danh sách ID các thẻ mà người dùng đã đăng ký nhận thông báo
	notifyOnNewComment?: boolean; // Cho phép nhận thông báo khi có bình luận mới trên bài viết đã đăng ký
	token?: string; // Token xác thực của người dùng, có thể được sử dụng để truy cập API
	evidenceUrl?: string; // Minh chứng là giảng viên (chỉ khi role = 'teacher')
	status?: 'active' | 'pending' | 'locked'; // Trạng thái tài khoản, có thể là 'active', 'pending' hoặc 'locked'
}

// Kiểu danh mục thẻ và thẻ trong hệ thống
export interface TagCategory {
	id: string; // ID duy nhất của danh mục
	name: string; // Tên danh mục
}
export interface Tag {
	id: string; // ID duy nhất của thẻ
	name: string; // Tên thẻ
	categoryId: string; // ID danh mục chứa thẻ này
}

// Kiểu bài viết và bình luận trong hệ thống
export interface Post {
	id: string;
	title: string;
	content: string;
	authorId: string;
	createdAt: string;
	tagIds: string[];
	votes: { [userId: string]: 1 | -1 }; // Lưu trữ điểm tương tác của người dùng với bài viết
	notifyOnNewComment: boolean; // Cho phép nhận thông báo khi có bình luận mới
}
export interface Comment {
	id: string;
	postId: string;
	parentCommentId?: string;
	authorId: string;
	content: string;
	createdAt: string;
	votes: { [userId: string]: 1 | -1 }; // Lưu trữ điểm tương tác của người dùng với bình luận
}

// Kiểu thống kê số lượng bài theo tháng
export interface PostByMonth {
	month: string; // 'YYYY-MM' dạng chuỗi
	count: number;
}

// Kiểu thống kê số lượng bài và bình luận theo tag
export interface TagStats {
	tagId: string;
	postCount: number; // Số lượng bài viết có tag này
	commentCount: number; // Số lượng bình luận trên các bài viết có tag này
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

//Quản lý bài đăng
export interface CreatePostPayload {
	title: string;
	content: string;
	tagIds: string[];
	authorId: string;
}

export interface EditPostPayload {
	id: string;
	title: string;
	content: string;
	tagIds: string[];
}

export interface AddCommentPayload {
	postId: string;
	content: string;
	authorId: string;
	parentCommentId?: string;
}

export type VoteType = 1 | -1;
