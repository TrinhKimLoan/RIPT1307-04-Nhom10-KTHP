import React, { useState, useEffect } from 'react';
import {
  Table, Button, Space, Popconfirm, Input, Tag, Avatar,
  Modal, Form, DatePicker, Switch, Upload, message, List
} from 'antd';
import {
  PlusOutlined, EyeOutlined, EditOutlined,
  DeleteOutlined, UploadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Club, getClubs, deleteClub, addOrUpdateClub } from './clubHelper';
import TinyEditor from '@/components/TinyEditor';
  
const ClubPage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [formVisible, setFormVisible] = useState(false);
  const [memberModal, setMemberModal] = useState<Club | null>(null);
  const [form] = Form.useForm();
  const [avatarBase64, setAvatarBase64] = useState<string>('');

  useEffect(() => {
    setClubs(getClubs());
  }, []);

  const handleDelete = (id: string) => {
    deleteClub(id);
    setClubs(getClubs());
    message.success('Xóa thành công');
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newClub: Club = {
        id: selectedClub?.id || Date.now().toString(),
        name: values.name,
        president: values.president,
        description: values.description,
        establishedDate: values.establishedDate.format('YYYY-MM-DD'),
        isActive: values.isActive,
        avatarUrl: avatarBase64 || selectedClub?.avatarUrl || '',
        members: selectedClub?.members || [],
      };
      addOrUpdateClub(newClub);
      setClubs(getClubs());
      setFormVisible(false);
      form.resetFields();
      setAvatarBase64('');
      message.success('Lưu thành công');
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin');
    }
  };

  const filtered = clubs.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()));

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const columns = [
    {
        title: 'Ảnh',
        dataIndex: 'avatarUrl',
        render: (url: string) => (
          <img
            src={url}
            alt="avatar"
            style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
          />
        ),
      },      
    {
      title: 'Tên CLB',
      dataIndex: 'name',
      sorter: (a: Club, b: Club) => a.name.localeCompare(b.name),
    },
    {
      title: 'Ngày thành lập',
      dataIndex: 'establishedDate',
      sorter: (a: Club, b: Club) => a.establishedDate.localeCompare(b.establishedDate),
    },
    {
      title: 'Chủ nhiệm',
      dataIndex: 'president',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'isActive',
      render: (active: boolean) => <Tag color={active ? 'green' : 'red'}>{active ? 'Có' : 'Không'}</Tag>,
      filters: [
        { text: 'Có', value: true },
        { text: 'Không', value: false },
      ],
      onFilter: (value: any, record: Club) => record.isActive === value,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (html: string) => <div dangerouslySetInnerHTML={{ __html: html }} />,
    },
    {
      title: 'Thao tác',
      render: (_: any, record: Club) => (
        <Space>
          <Button icon={<EyeOutlined />} onClick={() => setMemberModal(record)}>Thành viên</Button>
          <Button icon={<EditOutlined />} onClick={() => {
            setSelectedClub(record);
            setFormVisible(true);
            setAvatarBase64(record.avatarUrl || '');
            form.setFieldsValue({
              ...record,
              establishedDate: dayjs(record.establishedDate),
            });
          }} />
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm CLB"
          onSearch={val => setSearchText(val)}
          enterButton
        />
        <Button icon={<PlusOutlined />} type="primary" onClick={() => {
          setSelectedClub(null);
          setFormVisible(true);
          form.resetFields();
        }}>
          Thêm CLB
        </Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filtered}
        pagination={{ pageSize: 5 }}
      />

      {/* FORM THÊM/SỬA */}
      <Modal
        visible={formVisible}
        title={selectedClub ? 'Chỉnh sửa CLB' : 'Thêm mới CLB'}
        onCancel={() => setFormVisible(false)}
        onOk={handleSave}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên CLB" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="president" label="Chủ nhiệm CLB" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="establishedDate" label="Ngày thành lập" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="isActive" label="Hoạt động" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Ảnh đại diện">
            <Upload
                showUploadList={false}
                beforeUpload={async (file) => {
                const base64 = await getBase64(file);
                setAvatarBase64(base64);
                return false;
                }}
            >
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
            {avatarBase64 && (
                <img
                src={avatarBase64}
                alt="avatar"
                style={{ marginTop: 8, width: 64, height: 64, borderRadius: '50%' }}
                />
            )}
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <TinyEditor />
          </Form.Item>
        </Form>
      </Modal>

      {/* MODAL XEM DANH SÁCH THÀNH VIÊN */}
      <Modal
        visible={!!memberModal}
        onCancel={() => setMemberModal(null)}
        onOk={() => setMemberModal(null)}
        title="Danh sách thành viên"
      >
        <List
          dataSource={memberModal?.members || []}
          renderItem={(item, index) => <List.Item>{index + 1}. {item}</List.Item>}
        />
      </Modal>
    </div>
  );
};

export default ClubPage;
