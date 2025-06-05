import React from 'react';
import { Card, Table } from 'antd';
import { Tag } from '@/services/Admin/admin.types'; 

interface TagStat {
	tagId: string;
	postCount: number;
	commentCount: number;
}

interface TagStatsTableProps {
	data: TagStat[];
	tags: Tag[];
}

const TagStatsTable: React.FC<TagStatsTableProps> = ({ data, tags }) => {
	const columns = [
		{
			title: 'Tag',
			dataIndex: 'tagId',
			key: 'tagId',
			render: (tagId: string) => {
				const tag = tags.find((t) => t.id === tagId);
				return tag ? tag.name : tagId;
			},
		},
		{
			title: 'Số bài đăng',
			dataIndex: 'postCount',
			key: 'postCount',
		},
		{
			title: 'Số bình luận',
			dataIndex: 'commentCount',
			key: 'commentCount',
		},
	];

	return (
		<Card title='Thống kê bài và bình luận theo Tag' style={{ marginBottom: 24 }}>
			<Table dataSource={data} columns={columns} rowKey='tagId' pagination={false} bordered />
		</Card>
	);
};

export default TagStatsTable;
