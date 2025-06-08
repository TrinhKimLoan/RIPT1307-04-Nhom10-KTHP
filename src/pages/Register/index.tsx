import { Card, message } from 'antd';
import { history } from 'umi';
import { useModel } from 'umi';
import { UserRole } from '@/services/Users/typings.d';
import { useState } from 'react';
import RegisterForm from './Form';

const RegisterPage = () => {
  const [role, setRole] = useState<UserRole>(UserRole.Student);
  const [proofImage, setProofImage] = useState<string | undefined>();
  const { addUser } = useModel('users');
  const { findUserByEmail } = useModel('users');

  const handleRegister = async (values: any) => {
    const { fullName, email, password, role } = values;

    if (findUserByEmail(email)) {
      message.error('Email đã được đăng ký.');
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
      role,
      proofImageBase64: role === UserRole.Teacher ? proofImage : undefined,
    };

    addUser(newUser);
    message.success('Đăng ký thành công!');
    history.push('/login');
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Card title="Đăng ký tài khoản">
        <RegisterForm
          onFinish={handleRegister}
          role={role}
          setRole={setRole}
          proofImage={proofImage}
          setProofImage={setProofImage}
        />
      </Card>
    </div>
  );
};

export default RegisterPage;