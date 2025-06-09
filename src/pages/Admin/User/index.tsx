import { useModel } from 'umi';
import { Tabs, Input, Select, Row, Col, Button, Space, Table, Tag, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import UserTable from '@/pages/Admin/User/components/UserTable';
import PendingUserTable from './components/PendingUserTable';

const { TabPane } = Tabs;
const { Title } = Typography;

export default function UserManagementPage() {
  const {
    systemUsers,
    pendingUsers,
    search,
    roleFilter,
    setSearch,
    setRoleFilter,
    deleteUser,
    approveUser,
    toggleLock,
    updateUser,
    resetPassword,
    refresh,
    } = useModel('Admin.user');

  return (
    <div className="p-4">
      <Title level={3}>Quản lý người dùng</Title>

      <Row gutter={16} className="mb-4">
        <Col span={8}>
          <Input
            placeholder="Tìm theo tên hoặc email"
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </Col>
        <Col span={6}>
          <Select
            placeholder="Lọc theo vai trò"
            value={roleFilter}
            onChange={(val) => setRoleFilter(val)}
            style={{ width: '100%' }}
            allowClear
          >
            <Select.Option value="student">Sinh viên</Select.Option>
            <Select.Option value="teacher">Giảng viên</Select.Option>
            <Select.Option value="admin">Quản trị viên</Select.Option>
          </Select>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Người dùng hệ thống" key="1">
          <UserTable users={systemUsers} />
        </TabPane>
        <TabPane tab="Chờ duyệt tài khoản" key="2">
          <PendingUserTable users={pendingUsers} />
        </TabPane>
      </Tabs>
    </div>
  );
} 