import { Table, Button, Space, Popconfirm } from 'antd';
import { User } from '@/services/Admin/admin.types';

interface Props {
  users: User[];
}

export default function PendingUserTable({ users }: Props) {
  const columns = [
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
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdAt',
    },
    {
      title: 'Hành động',
      dataIndex: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <Button type="link">Duyệt</Button>
          <Popconfirm title="Xác nhận xóa?">
            <Button danger type="link">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />;
}
