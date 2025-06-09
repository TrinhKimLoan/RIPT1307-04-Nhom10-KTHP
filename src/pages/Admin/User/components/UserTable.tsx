import { Table, Tag, Button, Space, Popconfirm } from 'antd';
import { User } from '@/services/Admin/admin.types';

interface Props {
  users: User[];
}

export default function UserTable({ users }: Props) {
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isLocked',
      render: (isLocked: boolean) => (
        <Tag color={isLocked ? 'red' : 'green'}>
          {isLocked ? 'Đã khóa' : 'Đang hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button type="link">Sửa</Button>
          <Button type="link">Cấp lại mật khẩu</Button>
          <Button type="link">{record.isLocked ? 'Mở khóa' : 'Khóa'}</Button>
          <Popconfirm title="Xác nhận xóa?">
            <Button danger type="link">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />;
}
