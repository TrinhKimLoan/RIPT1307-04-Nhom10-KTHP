import React from 'react';
import { Button, Dropdown, Menu, message } from 'antd';
import { useHistory } from 'umi';
import type { User } from '@/services/Users/typings.d';
import { UserRole } from '@/services/Users/typings.d';
import styles from '@/styles/MyRightContent.less';

const MyRightContent: React.FC = () => {
  const history = useHistory();

  const storedUser = localStorage.getItem('currentUser');
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const getAvatarUrl = () => {
    if (!user) return '/images/default.png';
    switch (user.role) {
      case UserRole.Student:
        return '/images/student.jpg';
      case UserRole.Teacher:
        return '/images/teacher.png';
      case UserRole.Admin:
        return '/images/admin.jpg';
      default:
        return '/images/default.png';
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    message.success('Đã đăng xuất');
    history.push('/login'); // hoặc reload
  };

  const renderLoggedInMenu = (
    <Menu>
      {user?.role === UserRole.Admin && (
        <Menu.Item key="admin" onClick={() => history.push('/admin')}>
          Trang quản trị
        </Menu.Item>
      )}
      <Menu.Item key="logout" danger onClick={logout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.rightContent}>
      <img src={getAvatarUrl()} className={styles.avatar} alt="avatar" />
      {!user ? (
        <>
          <Button type="link" onClick={() => history.push('/login')}>
            Đăng nhập
          </Button>
          <Button type="primary" onClick={() => history.push('/register')}>
            Đăng ký
          </Button>
        </>
      ) : (
        <Dropdown overlay={renderLoggedInMenu} placement="bottomRight">
          <span className={styles.username}>{user.fullName}</span>
        </Dropdown>
      )}
    </div>
  );
};

export default MyRightContent;
