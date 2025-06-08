// services/auth/token.ts
import type { User } from '../Users/typings';
import type { AuthPayload } from './typings';

// Tạo token bằng cách mã hoá chuỗi base64 từ AuthPayload
export const generateToken = (user: User): string => {
  const payload: AuthPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  return btoa(JSON.stringify(payload)); // base64 encode
};

export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const parseToken = (): AuthPayload | null => {
  const token = getToken();
  if (!token) return null;
  try {
    return JSON.parse(atob(token)) as AuthPayload; // base64 decode
  } catch {
    return null;
  }
};
