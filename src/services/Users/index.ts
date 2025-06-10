import { UserRole, type User } from './typings.d';
import { hashPassword } from '@/services/Auth/hash';

const STORAGE_KEY = 'users';

// Admin mặc định
const defaultAdmin: User = {
  id: 'admin-default', 
  fullName: 'Administrator',
  email: 'admin@forum.com',
  password: hashPassword('adminnum1'),
  role: UserRole.Admin,
  isLocked: false,
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const getUsers = (): User[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  let users: User[] = raw ? JSON.parse(raw) : [];

  const adminExists = users.some(
    (u) => u.email === defaultAdmin.email && u.role === 'admin'
  );

  if (!adminExists) {
    users = [...users, defaultAdmin];
    saveUsers(users);
  }

  return users;
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
  const users = getUsers().filter((u) => u.id !== userId);

  // Kiểm tra nếu admin bị xóa thì thêm lại
  const stillHasAdmin = users.some(
    (u) => u.email === defaultAdmin.email && u.role === 'admin'
  );
  const newUsers = stillHasAdmin ? users : [...users, defaultAdmin];

  saveUsers(newUsers);
};

export const toggleUserLock = (userId: string, isLocked: boolean): User | null => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return null;
  
  const updatedUser = { ...user, isLocked };
  return updateUser(updatedUser);
};

export const getUserById = (id: string): User | undefined => {
  return getUsers().find(u => u.id === id);
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  if (!userData) return null;
  
  try {
    const currentUser = JSON.parse(userData);
    const users = getUsers();
    return users.find(u => u.id === currentUser.id) || null;
  } catch (e) {
    return null;
  }
};

export const getCurrentUserId = (): string => {
  const user = getCurrentUser();
  return user?.id || '';
};

// 1 số hàm của Admin
// Hàm cập nhật thông tin người dùng
export function updateUserAd(id: string, updated: Partial<User>): void {
	const users = getUsers();
	const index = users.findIndex((u) => u.id === id);
	if (index !== -1) {
		users[index] = { ...users[index], ...updated };
		saveUsers(users);
	}
}

// Hàm tìm kiếm người dùng theo tên hoặc email
export function toggleLockUser(id: string): void {
	const users = getUsers();
	const index = users.findIndex((u) => u.id === id);
	if (index !== -1) {
		users[index].isLocked = !users[index].isLocked;
		saveUsers(users);
	}
}

// Hàm reset mật khẩu người dùng
export function resetPassword(id: string): string | undefined {
	const users = getUsers();
	const index = users.findIndex((u) => u.id === id);
	if (index !== -1) {
		const newPassword = generateRandomPassword();
		users[index].password = newPassword;
		saveUsers(users);
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
	updateUserAd(id, { status : 'active' });
}

// Hàm từ chối người dùng
export function rejectUser(id: string): void {
	updateUserAd(id, { status: 'locked' });
}