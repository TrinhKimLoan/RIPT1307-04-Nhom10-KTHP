import { User } from './typings';

const KEY = 'users';
const TOKEN_KEY = 'token_user';

export const getUsers = (): User[] => JSON.parse(localStorage.getItem(KEY) || '[]');
export const saveUsers = (users: User[]) => localStorage.setItem(KEY, JSON.stringify(users));

export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem(TOKEN_KEY);
  const users = getUsers();
  return users.find(u => u.token === token) || null;
};

export const updateUser = (updatedUser: User) => {
  const users = getUsers().map(u => u.id === updatedUser.id ? updatedUser : u);
  saveUsers(users);
};

export const getUserById = (id: string): User | undefined => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  return users.find((u: User) => u.id === id);
};

export const getCurrentUserId = (): string => {
  const user = getCurrentUser();
  return user?.id || '';
};
