import { Form, Input, Select, Switch } from 'antd';
import TinyEditor from '@/components/TinyEditor';
import { useEffect, useState } from 'react';
import { getTags } from '@/services/AcademicForum/tagService';
import { Tags } from '@/models/forumModels';

export default function PostForm({ onSubmit, initialValue }: {
  onSubmit: (data: any) => void;
  initialValue?: any;
}) {
  const [tags, setTags] = useState<Tags[]>([]);
  const [form] = Form.useForm();
  const [content, setContent] = useState(initialValue?.content || '');

  useEffect(() => {
    setTags(getTags());
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={values => onSubmit({ ...values, content })} initialValues={initialValue}>
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
        <Input />
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
      <Form.Item name="notifyOnNewComment" label="Nhận thông báo bình luận" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
}
