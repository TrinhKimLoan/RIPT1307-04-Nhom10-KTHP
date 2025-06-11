import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { UserRole } from '@/services/Users/typings.d';
import type { User } from '@/services/Users/typings.d';

const { Option } = Select;

export interface UserFormProps {
	initialValues?: Partial<User>;
	onFinish: (values: Partial<User>) => void;
}

const roleOptions: UserRole[] = [UserRole.Student, UserRole.Teacher];

const UserForm: React.FC<UserFormProps> = ({ initialValues, onFinish }) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(
			initialValues || {
				fullName: '',
				email: '',
				password: '',
				role: 'student', // Mặc định là 'student'
			},
		);
	}, [initialValues, form]);

	return (
		<Form form={form} layout='vertical' onFinish={onFinish} initialValues={initialValues}>
			<Form.Item name='fullName' label='Tên' rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
				<Input placeholder='Nhập tên' />
			</Form.Item>

			<Form.Item
				name='email'
				label='Email'
				rules={[
					{ required: true, message: 'Vui lòng nhập email' },
					{ type: 'email', message: 'Email không hợp lệ' },
				]}
			>
				<Input placeholder='Nhập email' />
			</Form.Item>

			<Form.Item
				name='password'
				label='Mật khẩu'
				rules={[
					{ required: !initialValues?.id, message: 'Vui lòng nhập mật khẩu' },
					{ min: 6, message: 'Mật khẩu ít nhất 6 ký tự' },
				]}
				extra={initialValues?.id ? 'Để trống nếu không muốn đổi mật khẩu' : ''}
			>
				<Input.Password placeholder='Nhập mật khẩu' />
			</Form.Item>

			<Form.Item name='role' label='Vai trò' rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
				<Select>
					{roleOptions.map((r) => (
						<Option key={r} value={r}>
							{r.charAt(0).toUpperCase() + r.slice(1)}
						</Option>
					))}
				</Select>
			</Form.Item>
		</Form>
	);
};

export default UserForm;