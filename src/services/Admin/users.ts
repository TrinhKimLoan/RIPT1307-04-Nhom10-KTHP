import type { User } from '@/services/Admin/admin.types';

// Khóa lưu trữ người dùng
const STORAGE_KEY = 'users';

// Lưu trữ người dùng trong localStorage
function getUsersFromStorage(): User[] {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}

// Lưu người dùng vào localStorage
function saveUsersToStorage(users: User[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// Hàm lấy tất cả người dùng
export function getAllUsers(): User[] {
	return getUsersFromStorage();
}

// Hàm thêm người dùng mới
export function addUser(user: User): void {
	const users = getUsersFromStorage();
	users.push(user);
	saveUsersToStorage(users);
}

// Hàm cập nhật thông tin người dùng
export function updateUser(id: string, updated: Partial<User>): void {
	const users = getUsersFromStorage();
	const index = users.findIndex((u) => u.id === id);
	if (index !== -1) {
		users[index] = { ...users[index], ...updated };
		saveUsersToStorage(users);
	}
}

// Hàm xóa người dùng
export function deleteUser(id: string): void {
	const users = getUsersFromStorage();
	const filtered = users.filter((u) => u.id !== id);
	saveUsersToStorage(filtered);
}

// Hàm tìm kiếm người dùng theo tên hoặc email
export function toggleLockUser(id: string): void {
	const users = getUsersFromStorage();
	const index = users.findIndex((u) => u.id === id);
	if (index !== -1) {
		users[index].isLocked = !users[index].isLocked;
		saveUsersToStorage(users);
	}
}

// Hàm reset mật khẩu người dùng
export function resetPassword(id: string): string | undefined {
	const users = getUsersFromStorage();
	const index = users.findIndex((u) => u.id === id);
	if (index !== -1) {
		const newPassword = generateRandomPassword();
		users[index].password = newPassword;
		saveUsersToStorage(users);
		return newPassword;
	}
	return undefined;
}

// Hàm tạo mật khẩu ngẫu nhiên
function generateRandomPassword(length = 8): string {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
	let password = '';
	for (let i = 0; i < length; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return password;
}

// Hàm phê duyệt người dùng
export function approveUser(id: string): void {
	updateUser(id, { status: 'active' });
}

// Hàm từ chối người dùng
export function rejectUser(id: string): void {
	updateUser(id, { status: 'locked' });
}
