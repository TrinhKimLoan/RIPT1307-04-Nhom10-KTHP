import { useState, useCallback } from 'react';
import { 
  getUsers, 
  saveUsers, 
  addUser as addUserService, 
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  findUserByEmail
} from '@/services/Users/index';
import type { User } from '@/services/Users/typings';
import * as userService from '@/services/Users/index';

export default () => {
  const [users, setUsers] = useState<User[]>(getUsers());
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState<string | undefined>(undefined);

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

  // 1 số hàm của Admin
  const toggleLockUser = useCallback(
		(id: string) => {
			userService.toggleLockUser(id);
			refreshUsers();
		},
		[refreshUsers],
	);

  const resetPassword = useCallback(
		(id: string): string | undefined => {
			const newPass = userService.resetPassword(id);
			refreshUsers();
			return newPass;
		},
		[refreshUsers],
	);

  const approveUser = useCallback(
		(id: string) => {
			userService.approveUser(id);
			refreshUsers();
		},
		[refreshUsers],
	);
  const rejectUser = useCallback(
		(id: string) => {
			userService.rejectUser(id);
			refreshUsers();
		},
		[refreshUsers],
	);
  // Hàm set filter tìm kiếm
	const setSearch = (text: string) => {
		setSearchText(text);
	};

	const setRoleFilter = (role?: string) => {
		setFilterRole(role);
	};

	// Dữ liệu filtered
	const filteredUsers = users.filter((u) => {
		const matchSearch =
			u.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
			u.email.toLowerCase().includes(searchText.toLowerCase());

		const matchRole = filterRole ? u.role === filterRole : true;

		return matchSearch && matchRole;
	});

  return {
    users,
    setSearch,
    refreshUsers,
    addUser,
    updateUser,
    deleteUser,
    lockUser,
    unlockUser,
    findUserByEmail,
    getUserById,
    toggleLockUser,
    resetPassword,
    approveUser,
    rejectUser,
    searchText,
    filterRole,
    setRoleFilter,
    filteredUsers
    
  };
};