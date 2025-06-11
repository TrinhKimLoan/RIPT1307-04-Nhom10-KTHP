import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useModel, history } from 'umi';
import styles from './index.less';

export default function LoginPage() {
  const { login } = useModel('currentUser');
  const { login: loginService } = useModel('auth'); // Sử dụng model auth

  const onFinish = async (values: any) => {
    const user = loginService(values.email, values.password);
    if (!user) {
      message.error('Sai tài khoản hoặc mật khẩu');
      return;
    }
    
    login(user);
    message.success('Đăng nhập thành công!');
    history.push('/');

    // Phân quyền điều hướng
    if (user.role === 'admin') {
      history.push('/admin/dashboard');
    } else {
      history.push('/forum');
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>Đăng nhập</Typography.Title>
        <Form name="login" onFinish={onFinish} layout="vertical">
          <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}> 
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}> 
            <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <Typography.Paragraph style={{ textAlign: 'center' }}>
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </Typography.Paragraph>
        </Form>
      </Card>
    </div>
  );
}