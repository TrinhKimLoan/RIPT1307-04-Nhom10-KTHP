import { Form, Button, Checkbox, message } from 'antd';
import React from 'react';
import FormEditor from './FormEditor';
import FormCategory from './FormCategory';
import FormTags from './FormTag';

interface PostFormProps {
  authorId: string;
  onSubmit: (post: any) => boolean;
  isEditing: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ authorId, onSubmit, isEditing }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const success = onSubmit({
      ...values,
      authorId,
    });

    if (success) {
      message.success(isEditing ? 'Cập nhật bài đăng thành công!' : 'Bạn đã đăng bài thành công!');
      form.resetFields();
    } else {
      message.error('Đã xảy ra lỗi khi lưu bài đăng');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ notifyOnNewComment: true }}
    >
      <Form.Item
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
      >
        <input className="ant-input" />
      </Form.Item>

      <FormEditor />
      <FormCategory form={form} />
      <FormTags form={form} />
      <Form.Item name="notifyOnNewComment" valuePropName="checked">
        <Checkbox>Gửi email khi có bình luận mới</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Đăng bài</Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
