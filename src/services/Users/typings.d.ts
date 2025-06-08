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
}