import React, {useEffect} from 'react';
import { Modal, Descriptions, Tag } from 'antd';
import type { Post } from '@/services/Posts/typings.d';
import { useModel } from 'umi';

interface Props {
	post: Post;
	onClose: () => void;
}

const PostDetail: React.FC<Props> = ({ post, onClose }) => {
	const { getComments } = useModel('posts');
	const { tags, fetchTag } = useModel('tags'); // lấy state.tags
	const comments = getComments(post.id);

	useEffect(() => {
		fetchTag(); // đảm bảo load tags từ localStorage
	}, []);

	const tagObjects = tags.filter(tag => post.tagIds.includes(tag.id));

	return (
		<Modal title='Chi tiết bài đăng' visible={true} footer={null} onCancel={onClose}>
			<Descriptions column={1}>
				<Descriptions.Item label='Tiêu đề'>{post.title}</Descriptions.Item>
				<Descriptions.Item label='Nội dung'>{post.content}</Descriptions.Item>
				<Descriptions.Item label="Tags">
					{tagObjects.map((tag) => (
						<Tag key={tag.id}>{tag.name}</Tag>
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