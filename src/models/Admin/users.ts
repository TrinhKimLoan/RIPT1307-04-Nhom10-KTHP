import { useState, useCallback } from 'react';
import type { User } from '@/services/Admin/admin.types';
import * as userService from '@/services/Admin/users';

export default function () {
	const [users, setUsers] = useState<User[]>(() => userService.getAllUsers());
	const [searchText, setSearchText] = useState('');
	const [filterRole, setFilterRole] = useState<string | undefined>(undefined);

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
			u.name.toLowerCase().includes(searchText.toLowerCase()) ||
			u.email.toLowerCase().includes(searchText.toLowerCase());

		const matchRole = filterRole ? u.role === filterRole : true;

		return matchSearch && matchRole;
	});

	// Đồng bộ lại users từ localStorage
	const refreshUsers = useCallback(() => {
		setUsers(userService.getAllUsers());
	}, []);

	const addUser = useCallback(
		(user: User) => {
			userService.addUser(user);
			refreshUsers();
		},
		[refreshUsers],
	);

	const updateUser = useCallback(
		(id: string, updated: Partial<User>) => {
			userService.updateUser(id, updated);
			refreshUsers();
		},
		[refreshUsers],
	);

	const deleteUser = useCallback(
		(id: string) => {
			userService.deleteUser(id);
			refreshUsers();
		},
		[refreshUsers],
	);

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

	const activeUsers = users.filter((u) => u.status === 'active');
	const pendingUsers = users.filter((u) => u.status === 'pending');
	const lockedUsers = users.filter((u) => u.status === 'locked');

	return {
		users: filteredUsers,
		searchText,
		filterRole,
		setSearch,
		setRoleFilter,
		activeUsers,
		pendingUsers,
		lockedUsers,
		addUser,
		updateUser,
		deleteUser,
		toggleLockUser,
		resetPassword,
		approveUser,
		rejectUser,
	};
}
