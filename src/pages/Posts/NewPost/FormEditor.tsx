import { Form } from 'antd';
import TinyEditor from '@/components/TinyEditor';

const FormEditor = () => {
  return (
    <Form.Item
      name="content"
      label="Nội dung"
      rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết' }]}
    >
      <TinyEditor />
    </Form.Item>
  );
};

export default FormEditor;
