import React, { useState } from 'react';
import { Button, Modal, message, Input, Select, Space, Typography } from 'antd';
import { useModel } from 'umi';
import UserList from './components/UsersList';
import UserForm from './components/UsersForm';
import type { User } from '@/services/Users/typings.d';
import { updateUserAd } from '@/services/Users';

const { Option } = Select;
const { Title } = Typography;

const UserPage: React.FC = () => {
	const {
		users, // Danh sách người dùng
		addUser, // Hàm thêm người dùng
		deleteUser, // Hàm xóa người dùng
	} = useModel('users');

    const {
        toggleLockUser, // Hàm khóa hoặc mở khóa người dùng
		resetPassword, // Hàm reset mật khẩu người dùng
		approveUser, // Hàm duyệt người dùng
		rejectUser, // Hàm duyệt và từ chối người dùng
		searchText, // Từ khóa tìm kiếm
		filterRole, // Vai trò lọc
		setSearch, // Hàm set từ khóa tìm kiếm
		setRoleFilter, // Hàm set vai trò lọc
		filteredUsers,
    } = useModel('users');
	const [modalVisible, setModalVisible] = useState(false);
	const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

	const openAddModal = () => {
		setEditingUser(undefined);
		setModalVisible(true);
	};

	const openEditModal = (user: User) => {
		setEditingUser(user);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const handleFormFinish = (values: Partial<User>) => {
		if (editingUser) {
			// Cập nhật user
			updateUserAd(editingUser.id, {
				...values,
				password: values.password || editingUser.password,
			});
			message.success('Cập nhật người dùng thành công!');
		} else {
			// Thêm user mới
			if (!values.fullName || !values.email || !values.password || !values.role) {
				message.error('Vui lòng nhập đầy đủ thông tin!');
				return;
			}
			addUser({
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                role: values.role,
                status: 'pending'  // Nếu 'status' là 1 field có trong User
            });
			message.success('Thêm người dùng thành công!');
		}
		closeModal();
	};

	const handleDelete = (id: string) => {
		deleteUser(id);
		message.success('Xóa người dùng thành công!');
	};

	const handleToggleLock = (id: string) => {
		toggleLockUser(id);
		message.success('Đã thay đổi trạng thái khóa!');
	};

	const handleResetPassword = (id: string) => {
		resetPassword(id);
		message.success('Đã reset mật khẩu thành công!');
	};

	const handleApprove = (id: string) => {
		approveUser(id);
		message.success('Duyệt người dùng thành công!');
	};

	const handleReject = (id: string) => {
		rejectUser(id);
		message.success('Từ chối người dùng thành công!');
	};

	return (
		<div style={{ padding: 24 }}>
			<Title level={2}>Quản lý người dùng</Title>
			<Space style={{ marginBottom: 24 }}>
				<Input.Search
					placeholder='Tìm kiếm tên hoặc email'
					allowClear
					style={{ width: 250 }}
					value={searchText}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Select
					allowClear
					placeholder='Lọc theo vai trò'
					style={{ width: 200 }}
					value={filterRole}
					onChange={(value) => setRoleFilter(value)}
				>
					<Option value='student'>Sinh viên</Option>
					<Option value='teacher'>Giảng viên</Option>
				</Select>
				<Button type='primary' onClick={openAddModal}>
					Thêm người dùng
				</Button>
			</Space>
			<UserList
				users={filteredUsers}
				onEdit={openEditModal}
				onDelete={handleDelete}
				onToggleLock={handleToggleLock}
				onResetPassword={handleResetPassword}
				onApprove={handleApprove}
				onReject={handleReject}
			/>
			<Modal
				title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
				visible={modalVisible}
				onCancel={closeModal}
				onOk={() => {
					// submit form
					document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
				}}
				okText='Lưu'
				cancelText='Hủy'
				destroyOnClose
			>
				<UserForm initialValues={editingUser} onFinish={handleFormFinish} />
			</Modal>
		</div>
	);
};

export default UserPage;