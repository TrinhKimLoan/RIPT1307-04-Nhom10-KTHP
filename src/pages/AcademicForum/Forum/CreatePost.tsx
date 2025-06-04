import { Form, Input, Button, Select, Switch, message } from 'antd';
import { useState, useEffect } from 'react';
import TinyEditor from '@/components/TinyEditor';
import { getTags } from '@/services/AcademicForum/tagService';
import { addPost } from '@/services/AcademicForum/postService';
import { v4 as uuidv4 } from 'uuid';
import { Tags } from '@/models/forumModels';

export default function CreatePost() {
  const [tags, setTags] = useState<Tags[]>([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    setTags(getTags());
  }, []);

  const onFinish = (values: any) => {
    const newPost = {
      id: uuidv4(),
      title: values.title,
      content,
      tagIds: values.tagIds,
      authorId: 'user1',
      createdAt: new Date().toISOString(),
      votes: {},
      notifyOnNewComment: values.notify,
    };
    addPost(newPost);
    message.success('Đã tạo bài viết!');
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
        <Input maxLength={100} />
      </Form.Item>

      <Form.Item label="Nội dung">
        <TinyEditor value={content} onChange={setContent} />
      </Form.Item>

      <Form.Item name="tagIds" label="Tags" rules={[{ required: true }]}>
        <Select mode="multiple" maxTagCount={5}>
          {tags.map(tag => (
            <Select.Option key={tag.id} value={tag.id}>
              {tag.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="notify" label="Nhận thông báo bình luận" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Đăng bài
      </Button>
    </Form>
  );
}
