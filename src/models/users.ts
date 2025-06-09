import { useState } from 'react';
import { 
  getUsers, 
  saveUsers, 
  addUser as addUserService, 
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  findUserByEmail
} from '@/services/Users/index';
import type { User } from '@/services/Users/typings';

export default () => {
  const [users, setUsers] = useState<User[]>(getUsers());

  const refreshUsers = () => {
    const updatedUsers = getUsers();
    setUsers(updatedUsers);
    return updatedUsers;
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = addUserService(user);
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (user: User) => {
    const updatedUser = updateUserService(user);
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    return updatedUser;
  };

  const deleteUser = (userId: string) => {
    deleteUserService(userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const lockUser = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isLocked: true } : user
    );
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
  };

  const unlockUser = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isLocked: false } : user
    );
    saveUsers(updatedUsers);
    setUsers(updatedUsers);
  };

  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId);
  };

  return {
    users,
    refreshUsers,
    addUser,
    updateUser,
    deleteUser,
    lockUser,
    unlockUser,
    findUserByEmail,
    getUserById
  };
};