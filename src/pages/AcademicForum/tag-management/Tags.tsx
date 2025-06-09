import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Tags, TagCategory } from '@/services/AcademicForum/typings';
import { getTags, addTag, updateTag, deleteTag, getCategories } from '@/services/AcademicForum/tagService';
import { v4 as uuidv4 } from 'uuid';

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [categories, setCategories] = useState<TagCategory[]>([]);
  const [form] = Form.useForm();
  const [editingTag, setEditingTag] = useState<Tags | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setTags(getTags());
    setCategories(getCategories());
  }, []);

  const handleOpenModal = (tag?: Tags) => {
    if (tag) {
      form.setFieldsValue(tag);
      setEditingTag(tag);
    } else {
      form.resetFields();
      setEditingTag(null);
    }
    setModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const tag: Tags = {
        id: editingTag ? editingTag.id : uuidv4(),
        name: values.name,
        categoryId: values.categoryId,
      };

      if (editingTag) {
        updateTag(tag);
        message.success('Cập nhật tag thành công');
      } else {
        addTag(tag);
        message.success('Thêm tag mới thành công');
      }

      setTags(getTags());
      setModalVisible(false);
    });
  };

  const handleDelete = (id: string) => {
    deleteTag(id);
    message.success('Xóa tag thành công');
    setTags(getTags());
  };

  const columns = [
    {
      title: 'Tên Tag',
      dataIndex: 'name',
    },
    {
      title: 'Thuộc danh mục',
      dataIndex: 'categoryId',
      render: (id: string) => categories.find(c => c.id === id)?.name || 'Không rõ',
    },
    {
      title: 'Hành động',
      render: (_: any, record: Tags) => (
        <Space>
          <Button onClick={() => handleOpenModal(record)}>Sửa</Button>
          <Popconfirm title="Xóa tag này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý Tag</h2>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => handleOpenModal()}
        style={{ marginBottom: 16 }}
      >
        Thêm tag
      </Button>

      <Table dataSource={tags} rowKey="id" columns={columns} />

      <Modal
        visible={modalVisible}
        title={editingTag ? 'Sửa tag' : 'Thêm tag'}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText="Lưu"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên tag" rules={[{ required: true, message: 'Nhập tên tag' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categoryId" label="Danh mục" rules={[{ required: true, message: 'Chọn danh mục' }]}>
            <Select>
              {categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagsPage;
