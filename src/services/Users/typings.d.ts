export enum UserRole {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  isLocked?: boolean;
  proofImageBase64?: string; // ảnh minh chứng base64
  favouriteTags?: string[];      // tagId[]
  notifyOnNewPost?: boolean;     // muốn nhận email khi có bài mới theo tag yêu thích?
  lastPopupAt?: string;          // ISO string để kiểm tra "mỗi ngày chỉ hiện 1 lần"
  token?: string; // Token tạm sau khi đăng nhập
  subscribedTags?: string[]; // Các tag người dùng quan tâm (id tag)
}