// Vai trò người dùng
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string; // UUID
  name: string;
  email: string;
  password?: string; // Mật khẩu có thể không cần thiết ở client nếu dùng OAuth hoặc chỉ mock
  role: UserRole;
  isLocked?: boolean; // Mặc định: false
  subscribedTags?: string[]; // Các tag người dùng quan tâm (id tag)
  notifyOnNewCommentByEmail?: boolean; // Có nhận email khi có comment mới không (đổi tên cho rõ ràng)
  token?: string; // Token tạm sau khi đăng nhập
}

// Phân loại tag: môn / lớp / khoa / lĩnh vực...
export interface TagCategory {
  id: string;
  name: string;
}

// Tag cụ thể (liên kết với category)
export interface Tags {
  id: string;
  name: string;
  categoryId: string;
}

// Bài viết (question)
export interface Post {
  id: string;
  title: string;
  content: string; // HTML string từ TinyEditor
  authorId: string;
  createdAt: string; // ISO string date
  tagIds: string[]; // max 5
  votes: { [userId: string]: 1 | -1 }; //user chỉ vote 1 lầnlần
  // notifyOnNewComment: boolean; // người đăng bài có nhận email khi có comment? (Thuộc tính này nên ở User settings)
}

// Bình luận bài viết hoặc trả lời comment
export interface Comment {
  id: string;
  postId: string;
  parentCommentId?: string; // nếu là trả lời comment khác
  authorId: string;
  content: string; // HTML từ TinyEditor
  createdAt: string; // ISO string date
  votes: {
    [userId: string]: 1 | -1;
  };
}

export interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  userId: string;
  onVote: (id: string, v: 1 | -1) => void;
}