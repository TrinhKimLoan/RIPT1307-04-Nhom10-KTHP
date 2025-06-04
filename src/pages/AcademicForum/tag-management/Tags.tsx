import { Table, Input, Button, Form } from 'antd';
import { useState, useEffect } from 'react';
import { getTags, getCategories, addTag, addCategory } from '@/services/AcademicForum/tagService';
import { v4 as uuidv4 } from 'uuid';
import { Tags , TagCategory } from '@/models/forumModels';

export default function TagManagement() {
  const [tags, setTags] = useState<Tags[]>([]);
  const [categories, setCategories] = useState<TagCategory[]>([]);

  useEffect(() => {
    setTags(getTags());
    setCategories(getCategories());
  }, []);

  return (
    <div>
      <h2>Quản lý Tag</h2>

      <Form onFinish={v => {
        addCategory({ id: uuidv4(), name: v.name });
        setCategories(getCategories());
      }}>
        <Form.Item name="name" label="Category mới">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Tạo Category</Button>
      </Form>

      <Form onFinish={v => {
        addTag({ id: uuidv4(), name: v.name, categoryId: v.categoryId });
        setTags(getTags());
      }}>
        <Form.Item name="name" label="Tên tag">
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Chọn Category">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Tạo Tag</Button>
      </Form>

      <Table dataSource={tags} rowKey="id" columns={[
        { title: 'Tên', dataIndex: 'name' },
        {
          title: 'Category',
          render: (_, tag) => categories.find(c => c.id === tag.categoryId)?.name || ''
        }
      ]} />
    </div>
  );
}
