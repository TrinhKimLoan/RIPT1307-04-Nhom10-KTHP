import { getUsers } from '@/services/Users/index';
import { hashPassword } from './hash';
import type { User } from '../Users/typings';

export const login = (email: string, password: string): User | null => {
  const users = getUsers();
  const hashed = hashPassword(password);
  
  return users.find(u => 
    u.email === email && 
    u.password === hashed && 
    !u.isLocked
  ) || null;
};

export const logout = () => {
  localStorage.removeItem('token');
};