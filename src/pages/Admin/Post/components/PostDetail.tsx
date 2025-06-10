import React from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import type { Post } from '@/services/Admin/admin.types';
import { useModel } from 'umi';

interface Props {
	post: Post;
	onClose: () => void;
}

const PostDetail: React.FC<Props> = ({ post, onClose }) => {
	const { getComments } = useModel('Admin.post');
	const comments = getComments(post.id);

	return (
		<Modal title='Chi tiết bài đăng' visible={true} footer={null} onCancel={onClose}>
			<Descriptions column={1}>
				<Descriptions.Item label='Tiêu đề'>{post.title}</Descriptions.Item>
				<Descriptions.Item label='Nội dung'>{post.content}</Descriptions.Item>
				<Descriptions.Item label='Tags'>
					{post.tagIds.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</Descriptions.Item>
				<Descriptions.Item label='Bình luận'>{comments.length}</Descriptions.Item>
				<Descriptions.Item label='Vote'>{Object.values(post.votes).reduce((sum, v) => sum + v, 0)}</Descriptions.Item>
				<Descriptions.Item label='Thời gian đăng'>{new Date(post.createdAt).toLocaleString()}</Descriptions.Item>
			</Descriptions>
		</Modal>
	);
};

export default PostDetail;
