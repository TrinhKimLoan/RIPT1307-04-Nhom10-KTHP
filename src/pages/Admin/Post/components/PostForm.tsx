import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useModel } from 'umi';
import type { Post } from '@/services/Admin/admin.types';

interface Props {
	visible: boolean;
	onClose: () => void;
	editingPost?: Post | null;
}

const PostForm: React.FC<Props> = ({ visible, onClose, editingPost }) => {
	const [form] = Form.useForm();
	const { addPost, updatePost } = useModel('Admin.post');

	useEffect(() => {
		if (editingPost) {
			form.setFieldsValue(editingPost);
		} else {
			form.resetFields();
		}
	}, [editingPost]);

	const handleFinish = (values: any) => {
		if (editingPost) {
			updatePost({
				id: editingPost.id,
				...values,
			});
			message.success('Cập nhật bài viết thành công');
		} else {
			addPost({
				...values,
				authorId: 'admin',
				notifyOnNewComment: true,
			});
			message.success('Thêm bài viết thành công');
		}
		onClose();
	};

	return (
		<Modal
			title={editingPost ? 'Sửa bài đăng' : 'Thêm bài đăng'}
			visible={visible}
			onCancel={onClose}
			onOk={() => form.submit()}
		>
			<Form layout='vertical' form={form} onFinish={handleFinish}>
				<Form.Item name='title' label='Tiêu đề' rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name='content' label='Nội dung' rules={[{ required: true }]}>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Form.Item name='tagIds' label='Tags' rules={[{ required: true }]}>
					<Select mode='multiple' options={[{ value: 'tech' }, { value: 'study' }, { value: 'social' }]} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default PostForm;
