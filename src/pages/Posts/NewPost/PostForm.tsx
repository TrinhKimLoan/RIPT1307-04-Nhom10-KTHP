import { Form, Button, Checkbox, message } from 'antd';
import React, { useEffect } from 'react';
import FormEditor from './FormEditor';
import FormCategory from './FormCategory';
import FormTags from './FormTag';
import { history } from 'umi';

interface PostFormProps {
  authorId: string;
  onSubmit: (post: any) => boolean;
  isEditing: boolean;
  initialValues?: any;
}

const PostForm: React.FC<PostFormProps> = ({
  authorId,
  onSubmit,
  isEditing,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues]);

  const onFinish = (values: any) => {
    const success = onSubmit({
      ...values,
      authorId,
    });

    if (success) {
      form.resetFields(); // reset sau khi submit thành công
      history.push('/forum');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        notifyOnNewComment: true,
        ...initialValues, // nếu có currentPost, sẽ gộp vào
      }}
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
        <Button type="primary" htmlType="submit">
          {isEditing ? 'Cập nhật bài viết' : 'Đăng bài'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;
