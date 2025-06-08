import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UserRole } from '@/services/Users/typings.d';

const { Option } = Select;

interface RegisterFormProps {
  onFinish: (values: any) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  proofImage?: string;
  setProofImage: (image: string | undefined) => void;
}

const RegisterForm = ({
  onFinish,
  role,
  setRole,
  proofImage,
  setProofImage
}: RegisterFormProps) => {
  const [form] = Form.useForm();

  const getBase64 = (file: File): Promise<string> => 
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handleBeforeUpload = async (file: File) => {
    const base64 = await getBase64(file);
    setProofImage(base64);
    return false; // prevent auto upload
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ role: UserRole.Student }}
    >
      <Form.Item 
        name="fullName" 
        label="Họ tên" 
        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Vui lòng nhập email!' },
          { type: 'email', message: 'Email không hợp lệ' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu!' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item 
        name="role" 
        label="Vai trò"
      >
        <Select onChange={(val) => setRole(val)}>
          <Option value={UserRole.Student}>Sinh viên</Option>
          <Option value={UserRole.Teacher}>Giảng viên</Option>
        </Select>
      </Form.Item>

      {role === UserRole.Teacher && (
        <Form.Item label="Minh chứng là giảng viên" required>
          <Upload
            maxCount={1}
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
          {proofImage && (
            <img
              src={proofImage}
              alt="Minh chứng"
              style={{ marginTop: 10, width: '100%', maxHeight: 200, objectFit: 'contain' }}
            />
          )}
        </Form.Item>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;