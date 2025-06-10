import React, { useMemo, useState } from 'react';
import { Button, Input, Table, Tag, Space, Select, message, Typography } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import DeleteConfirm from './components/DeleteConfirm';
import type { Post } from '@/services/Admin/admin.types';

const { Title } = Typography;

const PostListPage: React.FC = () => {
	const { posts, deletePost, searchPosts, getCommentCount } = useModel('Admin.post');
	const { initialState } = useModel('@@initialState'); // For user info if needed

	const [searchText, setSearchText] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

	const [selectedPost, setSelectedPost] = useState<Post | null>(null);
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail' | null>(null);
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

	const filteredPosts = useMemo(() => {
		let result = searchText ? searchPosts(searchText) : posts;
		if (selectedTag) {
			result = result.filter((p) => p.tagIds.includes(selectedTag));
		}
		return result;
	}, [searchText, selectedTag, posts]);

	const handleDelete = (id: string) => {
		deletePost(id);
		message.success('Đã xoá bài đăng');
		setConfirmDeleteId(null);
	};

	const columns = [
		{
			title: 'STT',
			key: 'index',
			align: 'center',
			render: (_: any, __: any, index: number) => index + 1,
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
		},
		{
			title: 'Tags',
			dataIndex: 'tagIds',
			render: (tags: string[]) => tags.map((tag) => <Tag key={tag}>{tag}</Tag>),
		},
		{
			title: 'Bình luận',
			align: 'center',
			render: (_: any, record: Post) => getCommentCount(record.id),
		},
		{
			title: 'Vote',
			align: 'center',
			render: (_: any, record: Post) => Object.values(record.votes).reduce((sum, v) => sum + v, 0),
		},
		{
			title: 'Thời gian đăng bài',
			dataIndex: 'createdAt',
			align: 'center',
			render: (time: string) => new Date(time).toLocaleString(),
		},
		{
			title: 'Hành động',
			align: 'center',
			render: (_: any, record: Post) => (
				<Space>
					<Button
						icon={<EyeOutlined />}
						onClick={() => {
							setSelectedPost(record);
							setModalType('detail');
						}}
					/>
					<Button
						icon={<EditOutlined />}
						onClick={() => {
							setSelectedPost(record);
							setModalType('edit');
						}}
					/>
					<Button danger icon={<DeleteOutlined />} onClick={() => setConfirmDeleteId(record.id)} />
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 24 }}>
			<Title level={2}>Quản lý bài đăng</Title>
			<Space style={{ marginBottom: 16 }}>
				<Input.Search
					placeholder='Tìm bài theo tiêu đề'
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					allowClear
				/>
				<Select
					placeholder='Lọc theo tag'
					allowClear
					value={selectedTag}
					onChange={(val) => setSelectedTag(val)}
					options={[...new Set(posts.flatMap((p) => p.tagIds))].map((tagId) => ({ value: tagId, label: tagId }))}
					style={{ width: 200 }}
				/>
				<Button
					type='primary'
					icon={<PlusOutlined />}
					onClick={() => {
						setSelectedPost(null);
						setModalType('create');
					}}
				>
					Thêm bài
				</Button>
			</Space>

			<Table columns={columns as any} dataSource={filteredPosts} rowKey='id' pagination={{ pageSize: 10 }} />

			{modalType === 'create' || modalType === 'edit' ? (
				<PostForm
					visible={!!modalType}
					onClose={() => setModalType(null)}
					editingPost={modalType === 'edit' ? selectedPost : null}
				/>
			) : null}

			{modalType === 'detail' && selectedPost && <PostDetail post={selectedPost} onClose={() => setModalType(null)} />}

			{confirmDeleteId && (
				<DeleteConfirm onCancel={() => setConfirmDeleteId(null)} onConfirm={() => handleDelete(confirmDeleteId)} />
			)}
		</div>
	);
};

export default PostListPage;
