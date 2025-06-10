import React from 'react';
import { Table, Button, Popconfirm, Space, Tag, Typography, Tooltip } from 'antd';
import {
	EditOutlined,
	DeleteOutlined,
	LockOutlined,
	UnlockOutlined,
	ReloadOutlined,
	CheckOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import type { User } from '@/services/Users/typings.d';

export interface UserListProps {
	users: User[];
	onEdit: (user: User) => void;
	onDelete: (id: string) => void;
	onToggleLock: (id: string) => void;
	onResetPassword: (id: string) => void;
	onApprove: (id: string) => void;
	onReject: (id: string) => void;
}

const statusColorMap = {
	active: 'green',
	pending: 'orange',
	locked: 'red',
};

const UserList: React.FC<UserListProps> = ({
	users,
	onEdit,
	onDelete,
	onToggleLock,
	onResetPassword,
	onApprove,
	onReject,
}) => {
	const columns = [
		{
			title: 'STT',
			key: 'index',
			align: 'center',
			render: (_: any, __: any, index: number) => index + 1,
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Vai trò',
			dataIndex: 'role',
			key: 'role',
			render: (role: string) => role.charAt(0).toUpperCase() + role.slice(1),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status?: string) => <Tag color={statusColorMap[status as keyof typeof statusColorMap] || 'default'}>{status}</Tag>,
		},
		{
			title: 'Khóa tài khoản',
			dataIndex: 'isLocked',
			key: 'isLocked',
			align: 'center',
			render: (locked: boolean) => (locked ? 'Có' : 'Không'),
		},
		{
			title: 'Mật khẩu',
			dataIndex: 'password',
			key: 'password',
			render: (text: string) => <Typography.Text copyable>{text || '—'}</Typography.Text>,
		},
		{
			title: 'Hành động',
			key: 'actions',
			align: 'center',
			render: (_: any, record: User) => (
				<Space>
					<Tooltip title='Sửa'>
						<Button type='text' icon={<EditOutlined />} onClick={() => onEdit(record)} />
					</Tooltip>
					<Popconfirm
						title='Bạn có chắc chắn muốn xóa user này?'
						onConfirm={() => onDelete(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Tooltip title='Xóa'>
							<Button type='text' icon={<DeleteOutlined />} danger />
						</Tooltip>
					</Popconfirm>
					<Tooltip title={record.isLocked ? 'Mở khóa' : 'Khóa tài khoản'}>
						<Button
							type='text'
							icon={record.isLocked ? <UnlockOutlined /> : <LockOutlined />}
							onClick={() => onToggleLock(record.id)}
						/>
					</Tooltip>
					<Popconfirm
						title='Bạn có chắc chắn muốn reset mật khẩu?'
						onConfirm={() => onResetPassword(record.id)}
						okText='Có'
						cancelText='Không'
					>
						<Tooltip title='Reset mật khẩu'>
							<Button type='text' icon={<ReloadOutlined />} />
						</Tooltip>
					</Popconfirm>
					{record.status === 'pending' && (
						<>
							<Tooltip title='Duyệt'>
								<Button type='text' icon={<CheckOutlined />} onClick={() => onApprove(record.id)} />
							</Tooltip>
							<Tooltip title='Từ chối'>
								<Button type='text' icon={<CloseOutlined />} onClick={() => onReject(record.id)} danger />
							</Tooltip>
						</>
					)}
				</Space>
			),
		},
	];
	return <Table rowKey='id' columns={columns as any} dataSource={users} pagination={{ pageSize: 10 }} />;
};

export default UserList;