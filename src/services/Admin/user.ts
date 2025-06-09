import { SystemUser, PendingUser } from '@/services/Admin/admin.types';

const SYSTEM_USERS_KEY = 'system_users';
const PENDING_USERS_KEY = 'pending_users';

export const getSystemUsers = (): SystemUser[] => {
  return JSON.parse(localStorage.getItem(SYSTEM_USERS_KEY) || '[]');
};

export const saveSystemUsers = (users: SystemUser[]) => {
  localStorage.setItem(SYSTEM_USERS_KEY, JSON.stringify(users));
};

export const getPendingUsers = (): PendingUser[] => {
  return JSON.parse(localStorage.getItem(PENDING_USERS_KEY) || '[]');
};

export const savePendingUsers = (users: PendingUser[]) => {
  localStorage.setItem(PENDING_USERS_KEY, JSON.stringify(users));
};

export const deleteUserById = (id: string, isPending: boolean = false) => {
  if (isPending) {
    const pending = getPendingUsers().filter(u => u.id !== id);
    savePendingUsers(pending);
  } else {
    const system = getSystemUsers().filter(u => u.id !== id);
    saveSystemUsers(system);
  }
};

export const approvePendingUser = (id: string, password: string) => {
  const pending = getPendingUsers();
  const system = getSystemUsers();
  const user = pending.find(u => u.id === id);
  if (!user) return;

  const approvedUser: SystemUser = {
    ...user,
    password,
    createdAt: new Date().toISOString(),
    status: 'active',
  };

  savePendingUsers(pending.filter(u => u.id !== id));
  saveSystemUsers([...system, approvedUser]);
};

export const toggleUserLock = (id: string) => {
  const system = getSystemUsers();
  const updated = system.map(user =>
    user.id === id ? { ...user, isLocked: !user.isLocked } : user
  );
  saveSystemUsers(updated);
};

export const updateUser = (updatedUser: SystemUser) => {
  const users = getSystemUsers();
  const newUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
  saveSystemUsers(newUsers);
};

export const resetPassword = (id: string, newPassword: string) => {
  const users = getSystemUsers().map(u =>
    u.id === id ? { ...u, password: newPassword } : u
  );
  saveSystemUsers(users);
};
