import { useState, useEffect } from 'react';
import type { User } from '@/services/Users/typings';
import { logout as logoutService } from '@/services/Auth';
import { history } from 'umi';

const STORAGE_KEY = 'currentUser';

export default () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Tải user từ localStorage khi khởi động
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setCurrentUser(JSON.parse(raw));
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setCurrentUser(user);
    history.push('/forum');
    location.reload();
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
    history.push('/login');
    location.reload(); 
  };

  return {
    currentUser,
    login,
    logout,
  };
};