import { useState, useEffect } from 'react';
import type { User } from '@/services/Users/typings';
import { logout as logoutService } from '@/services/Auth';

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
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem(STORAGE_KEY);
    setCurrentUser(null);
  };

  return {
    currentUser,
    login,
    logout,
  };
};