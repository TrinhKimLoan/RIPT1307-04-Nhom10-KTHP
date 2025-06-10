import type {Post} from '@/services/Posts/typings.d';
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
export interface CreatePostPayload extends Omit<Post, 'id' | 'createdAt' | 'votes'> {
  // Không cần thêm gì vì đã kế thừa đủ
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