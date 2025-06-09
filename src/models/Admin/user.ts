import { useCallback, useState } from 'react';
import type { SystemUser, PendingUser } from '@/services/Admin/admin.types';
import * as userService from '@/services/Admin/user';

export default () => {
  const [systemUsers, setSystemUsers] = useState<SystemUser[]>(userService.getSystemUsers());
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>(userService.getPendingUsers());

  // Thêm state lọc/tìm kiếm
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');

  const refresh = useCallback(() => {
    setSystemUsers(userService.getSystemUsers());
    setPendingUsers(userService.getPendingUsers());
  }, []);

  const deleteUser = useCallback((id: string, isPending: boolean) => {
    userService.deleteUserById(id, isPending);
    refresh();
  }, [refresh]);

  const approveUser = useCallback((id: string, password: string) => {
    userService.approvePendingUser(id, password);
    refresh();
  }, [refresh]);

  const toggleLock = useCallback((id: string) => {
    userService.toggleUserLock(id);
    refresh();
  }, [refresh]);

  const updateUser = useCallback((user: SystemUser) => {
    userService.updateUser(user);
    refresh();
  }, [refresh]);

  const resetPassword = useCallback((id: string, newPassword: string) => {
    userService.resetPassword(id, newPassword);
    refresh();
  }, [refresh]);

  return {
    systemUsers,
    pendingUsers,
    deleteUser,
    approveUser,
    toggleLock,
    updateUser,
    resetPassword,
    refresh,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
  };
};
