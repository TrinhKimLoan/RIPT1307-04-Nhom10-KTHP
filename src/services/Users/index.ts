import type { User } from './typings';
import { hashPassword } from '@/services/Auth/hash';

const STORAGE_KEY = 'users';

export const getUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  return getUsers().find(user => user.email === email);
};

export const addUser = (user: Omit<User, 'id' | 'isLocked'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    password: hashPassword(user.password),
    isLocked: false
  };
  saveUsers([...users, newUser]);
  return newUser;
};

export const updateUser = (user: User): User => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === user.id);
  
  if (index === -1) return user;
  
  // Giữ nguyên trạng thái khóa nếu không được cung cấp
  const updatedUser = {
    ...users[index],
    ...user,
    isLocked: user.isLocked !== undefined ? user.isLocked : users[index].isLocked
  };
  
  const updatedUsers = [...users];
  updatedUsers[index] = updatedUser;
  saveUsers(updatedUsers);
  return updatedUser;
};

export const deleteUser = (userId: string) => {
  const users = getUsers();
  saveUsers(users.filter(user => user.id !== userId));
};

export const toggleUserLock = (userId: string, isLocked: boolean): User | null => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  const updatedUser = { ...user, isLocked };
  return updateUser(updatedUser);
};